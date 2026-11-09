import { consultar, executar, gravarLinha, linhaParaObjeto, ENTIDADES, SYNC } from "./sqlite";
import { avisarDadosAlterados, sincronizar } from "./syncService";

function gerarId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function aposAlteracao() {
  avisarDadosAlterados();
  sincronizar();
}

export function listar(entidade) {
  const { tabela } = ENTIDADES[entidade];
  return consultar(`SELECT * FROM ${tabela} WHERE sync_status != ? ORDER BY rowid`, [SYNC.EXCLUSAO_PENDENTE]).map(
    (linha) => linhaParaObjeto(entidade, linha)
  );
}

export function buscarPorId(entidade, id) {
  const { tabela } = ENTIDADES[entidade];
  const [linha] = consultar(`SELECT * FROM ${tabela} WHERE id = ? AND sync_status != ?`, [
    String(id),
    SYNC.EXCLUSAO_PENDENTE
  ]);
  return linha ? linhaParaObjeto(entidade, linha) : null;
}

export function inserir(entidade, dados) {
  const novo = { ...dados, id: dados.id || gerarId() };
  gravarLinha(entidade, novo, SYNC.PENDENTE);
  aposAlteracao();
  return novo;
}

export function atualizar(entidade, id, dados) {
  const atual = buscarPorId(entidade, id);
  if (!atual) throw new Error("Registro não encontrado.");
  const atualizado = { ...atual, ...dados, id: String(id) };
  gravarLinha(entidade, atualizado, SYNC.PENDENTE);
  aposAlteracao();
  return atualizado;
}

export function excluir(entidade, id) {
  const { tabela } = ENTIDADES[entidade];
  executar(`UPDATE ${tabela} SET sync_status = ?, atualizado_em = ? WHERE id = ?`, [
    SYNC.EXCLUSAO_PENDENTE,
    new Date().toISOString(),
    String(id)
  ]);
  aposAlteracao();
}

export function relatorioAdocoes() {
  return consultar(
    `SELECT a.id,
            a.data,
            a.status,
            p.nome     AS petNome,
            p.tipo     AS petTipo,
            v.nome     AS adotanteNome,
            v.email    AS adotanteEmail,
            v.telefone AS adotanteTelefone
       FROM adocoes a
       LEFT JOIN pets p        ON p.id = a.pet_id        AND p.sync_status != :exc
       LEFT JOIN voluntarios v ON v.id = a.voluntario_id AND v.sync_status != :exc
      WHERE a.sync_status != :exc
      ORDER BY a.rowid`,
    { ":exc": SYNC.EXCLUSAO_PENDENTE }
  ).map((l) => ({
    ...l,
    petNome: l.petNome || "Não encontrado",
    petTipo: l.petTipo || "Gato/Cachorro",
    adotanteNome: l.adotanteNome || "Não encontrado",
    adotanteEmail: l.adotanteEmail || "Não encontrado",
    adotanteTelefone: l.adotanteTelefone || "Não encontrado"
  }));
}

export function linhasBrutas(entidade) {
  const { tabela } = ENTIDADES[entidade];
  return consultar(`SELECT * FROM ${tabela} ORDER BY rowid`);
}
