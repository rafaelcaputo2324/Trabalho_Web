import { consultar, executar, gravarLinha, linhaParaObjeto, lerMeta, gravarMeta, ENTIDADES, SYNC, DATA_EXEMPLO } from "./sqlite";
import * as nuvem from "./firestoreSync";
import { auth, onAuthStateChanged } from "./firebase";

const TEMPO_LIMITE_MS = 10000;
const INTERVALO_NOVA_TENTATIVA_MS = 30000;

let estado = {
  online: navigator.onLine,
  sincronizando: false,
  pendentes: 0,
  ultimaSincronizacao: null,
  erro: null,
  simulado: nuvem.MODO_SIMULADO
};
const ouvintesEstado = new Set();
const ouvintesDados = new Set();

function atualizarEstado(parcial) {
  estado = { ...estado, ...parcial };
  ouvintesEstado.forEach((fn) => fn(estado));
}

export function obterEstado() {
  return estado;
}

export function aoMudarEstado(fn) {
  ouvintesEstado.add(fn);
  return () => ouvintesEstado.delete(fn);
}

export function aoAlterarDados(fn) {
  ouvintesDados.add(fn);
  return () => ouvintesDados.delete(fn);
}

export function avisarDadosAlterados() {
  ouvintesDados.forEach((fn) => fn());
  atualizarEstado({ pendentes: contarPendentes() });
}

export function contarPendentes() {
  return Object.values(ENTIDADES).reduce((total, { tabela }) => {
    const [linha] = consultar(`SELECT COUNT(*) AS n FROM ${tabela} WHERE sync_status != ?`, [SYNC.SINCRONIZADO]);
    return total + linha.n;
  }, 0);
}

function comTempoLimite(promessa) {
  return Promise.race([
    promessa,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tempo esgotado ao falar com o Firestore.")), TEMPO_LIMITE_MS)
    )
  ]);
}

async function enviarPendentes() {
  for (const [entidade, { tabela, colecao }] of Object.entries(ENTIDADES)) {
    const pendentes = consultar(`SELECT * FROM ${tabela} WHERE sync_status != ?`, [SYNC.SINCRONIZADO]);

    for (const linha of pendentes) {
      if (!navigator.onLine) throw new Error("A conexão caiu durante a sincronização.");

      if (linha.sync_status === SYNC.EXCLUSAO_PENDENTE) {
        await comTempoLimite(nuvem.excluirDocumento(colecao, linha.id));
        executar(`DELETE FROM ${tabela} WHERE id = ? AND sync_status = ?`, [linha.id, SYNC.EXCLUSAO_PENDENTE]);
      } else {
        const dados = { ...linhaParaObjeto(entidade, linha), atualizadoEm: linha.atualizado_em };
        await comTempoLimite(nuvem.enviarDocumento(colecao, linha.id, dados));
        executar(
          `UPDATE ${tabela} SET sync_status = ? WHERE id = ? AND sync_status = ? AND atualizado_em = ?`,
          [SYNC.SINCRONIZADO, linha.id, SYNC.PENDENTE, linha.atualizado_em]
        );
      }
    }
  }
}

async function baixarDaNuvem() {
  for (const [entidade, { tabela, colecao }] of Object.entries(ENTIDADES)) {
    const remotos = await comTempoLimite(nuvem.buscarColecao(colecao));
    if (!Array.isArray(remotos)) continue;

    const idsRemotos = new Set();
    for (const documento of remotos) {
      const id = String(documento.id);
      idsRemotos.add(id);
      const [local] = consultar(`SELECT sync_status, atualizado_em FROM ${tabela} WHERE id = ?`, [id]);
      const localMaisRecente =
        local &&
        local.sync_status !== SYNC.SINCRONIZADO &&
        local.atualizado_em !== DATA_EXEMPLO &&
        local.atualizado_em >= (documento.atualizadoEm || "");
      if (localMaisRecente) continue;
      gravarLinha(entidade, { ...documento, id }, SYNC.SINCRONIZADO);
    }

    const locais = consultar(`SELECT id, sync_status, atualizado_em FROM ${tabela}`);
    for (const linha of locais) {
      if (idsRemotos.has(linha.id)) continue;
      const apagadaNaNuvem = linha.sync_status === SYNC.SINCRONIZADO;
      const exemploDescartavel = linha.atualizado_em === DATA_EXEMPLO && remotos.length > 0;
      if (apagadaNaNuvem || exemploDescartavel) {
        executar(`DELETE FROM ${tabela} WHERE id = ?`, [linha.id]);
      }
    }
  }
}

let sincronizacaoAtual = null;
let repetirDepois = false;

export async function sincronizar() {
  if (!navigator.onLine) {
    atualizarEstado({ online: false, pendentes: contarPendentes() });
    return;
  }

  if (!nuvem.MODO_SIMULADO && !auth.currentUser) {
    atualizarEstado({ online: true, pendentes: contarPendentes() });
    return;
  }

  if (sincronizacaoAtual) {
    repetirDepois = true;
    return sincronizacaoAtual;
  }

  sincronizacaoAtual = (async () => {
    atualizarEstado({ online: true, sincronizando: true, erro: null });
    try {
      await baixarDaNuvem();

      do {
        repetirDepois = false;
        await enviarPendentes();
      } while (repetirDepois);

      const agora = new Date().toISOString();
      gravarMeta("ultima_sincronizacao", agora);
      atualizarEstado({ ultimaSincronizacao: agora });
    } catch (err) {
      console.error("[Sync] Falha na sincronização:", err);
      atualizarEstado({ erro: err.message });
    } finally {
      sincronizacaoAtual = null;
      atualizarEstado({ sincronizando: false });
      avisarDadosAlterados();
    }
  })();

  return sincronizacaoAtual;
}

export function iniciarSincronizacao() {
  const modoAtual = nuvem.MODO_SIMULADO ? "simulado" : "firestore";
  if (lerMeta("modo_sync") === "simulado" && modoAtual === "firestore") {
    for (const { tabela } of Object.values(ENTIDADES)) {
      executar(`UPDATE ${tabela} SET sync_status = ? WHERE sync_status = ?`, [SYNC.PENDENTE, SYNC.SINCRONIZADO]);
    }
  }
  if (lerMeta("modo_sync") !== modoAtual) gravarMeta("modo_sync", modoAtual);

  atualizarEstado({
    online: navigator.onLine,
    pendentes: contarPendentes(),
    ultimaSincronizacao: lerMeta("ultima_sincronizacao")
  });

  window.addEventListener("online", () => {
    console.log("[Sync] Internet voltou. Sincronizando pendentes...");
    sincronizar();
  });
  window.addEventListener("offline", () => {
    console.log("[Sync] Sem internet. Novos dados ficam no SQLite.");
    atualizarEstado({ online: false });
  });

  onAuthStateChanged(auth, (usuario) => {
    if (usuario) sincronizar();
  });

  setInterval(() => {
    if (navigator.onLine && estado.pendentes > 0) sincronizar();
  }, INTERVALO_NOVA_TENTATIVA_MS);

  sincronizar();
}
