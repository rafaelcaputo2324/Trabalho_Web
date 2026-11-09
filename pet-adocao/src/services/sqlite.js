import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm-browser.wasm?url";
import { petsIniciais, voluntariosIniciais, adocoesIniciais } from "./dadosIniciais";

export const SYNC = {
  SINCRONIZADO: "SINCRONIZADO",
  PENDENTE: "PENDENTE",
  EXCLUSAO_PENDENTE: "EXCLUSAO_PENDENTE"
};

export const DATA_EXEMPLO = "1970-01-01T00:00:00.000Z";

export const ENTIDADES = {
  pets: {
    tabela: "pets",
    colecao: "pets",
    campos: { id: "id", nome: "nome", tipo: "tipo", raca: "raca", idade: "idade", desc: "descricao", img: "img" }
  },
  voluntarios: {
    tabela: "voluntarios",
    colecao: "voluntarios",
    campos: {
      id: "id", nome: "nome", telefone: "telefone", email: "email", idade: "idade",
      cep: "cep", endereco: "endereco", tempo: "tempo", genero: "genero"
    }
  },
  adocoes: {
    tabela: "adocoes",
    colecao: "adocoes",
    campos: { id: "id", petId: "pet_id", volunteerId: "voluntario_id", data: "data", status: "status", motivo: "motivo" }
  }
};

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS pets (
    id            TEXT PRIMARY KEY,
    nome          TEXT NOT NULL,
    tipo          TEXT,
    raca          TEXT,
    idade         TEXT,
    descricao     TEXT,
    img           TEXT,
    sync_status   TEXT NOT NULL DEFAULT 'PENDENTE',
    atualizado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS voluntarios (
    id            TEXT PRIMARY KEY,
    nome          TEXT NOT NULL,
    telefone      TEXT,
    email         TEXT,
    idade         TEXT,
    cep           TEXT,
    endereco      TEXT,
    tempo         TEXT,
    genero        TEXT,
    sync_status   TEXT NOT NULL DEFAULT 'PENDENTE',
    atualizado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS adocoes (
    id            TEXT PRIMARY KEY,
    pet_id        TEXT,
    voluntario_id TEXT,
    data          TEXT,
    status        TEXT,
    motivo        TEXT,
    sync_status   TEXT NOT NULL DEFAULT 'PENDENTE',
    atualizado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS meta (
    chave TEXT PRIMARY KEY,
    valor TEXT
  );
`;

let db = null;

const IDB_NOME = "cafofo_sqlite";
const IDB_STORE = "arquivos";
const IDB_CHAVE = "banco.sqlite";

function abrirIndexedDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NOME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function lerArquivoSalvo() {
  const idb = await abrirIndexedDB();
  return new Promise((resolve, reject) => {
    const req = idb.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(IDB_CHAVE);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function gravarArquivo(bytes) {
  const idb = await abrirIndexedDB();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(bytes, IDB_CHAVE);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

let filaGravacao = Promise.resolve();
function persistir() {
  const bytes = db.export();
  filaGravacao = filaGravacao
    .then(() => gravarArquivo(bytes))
    .catch((err) => console.error("[SQLite] Erro ao salvar o banco no navegador:", err));
  return filaGravacao;
}

export async function iniciarBanco() {
  if (db) return db;

  const SQL = await initSqlJs({ locateFile: () => wasmUrl });
  const arquivoSalvo = await lerArquivoSalvo();

  db = arquivoSalvo ? new SQL.Database(arquivoSalvo) : new SQL.Database();
  db.exec(SCHEMA);

  if (!arquivoSalvo) {
    popularBancoNovo();
    await persistir();
  }

  console.log("[SQLite] Banco local pronto.");
  return db;
}

function popularBancoNovo() {
  const doLocalStorage = (chave) => {
    try {
      const bruto = localStorage.getItem(chave);
      return bruto ? JSON.parse(bruto) : null;
    } catch {
      return null;
    }
  };

  const exemplo = (lista) => lista.map((item) => ({ ...item, atualizadoEm: DATA_EXEMPLO }));

  const pets = doLocalStorage("cafofo_pets") || exemplo(petsIniciais);
  const voluntarios = doLocalStorage("cafofo_volunteers") || exemplo(voluntariosIniciais);
  const adocoes = doLocalStorage("cafofo_adoptions") || exemplo(adocoesIniciais);

  pets.forEach((p) => gravarLinha("pets", p, SYNC.PENDENTE));
  voluntarios.forEach((v) => gravarLinha("voluntarios", v, SYNC.PENDENTE));
  adocoes.forEach((a) => gravarLinha("adocoes", a, SYNC.PENDENTE));
}

function getDb() {
  if (!db) throw new Error("Banco SQLite ainda não foi iniciado. Chame iniciarBanco() antes.");
  return db;
}

export function consultar(sql, params = []) {
  const stmt = getDb().prepare(sql);
  stmt.bind(params);
  const linhas = [];
  while (stmt.step()) linhas.push(stmt.getAsObject());
  stmt.free();
  return linhas;
}

export function executar(sql, params = []) {
  getDb().run(sql, params);
  persistir();
}

export function linhaParaObjeto(entidade, linha) {
  const obj = {};
  for (const [campo, coluna] of Object.entries(ENTIDADES[entidade].campos)) {
    obj[campo] = linha[coluna] ?? "";
  }
  return obj;
}

export function gravarLinha(entidade, obj, syncStatus) {
  const { tabela, campos } = ENTIDADES[entidade];
  const colunas = [...Object.values(campos), "sync_status", "atualizado_em"];
  const valores = [
    ...Object.keys(campos).map((campo) =>
      obj[campo] === undefined || obj[campo] === null ? null : String(obj[campo])
    ),
    syncStatus,
    obj.atualizadoEm || new Date().toISOString()
  ];
  const marcadores = colunas.map(() => "?").join(", ");
  const atualizacoes = colunas
    .filter((c) => c !== "id")
    .map((c) => `${c} = excluded.${c}`)
    .join(", ");

  executar(
    `INSERT INTO ${tabela} (${colunas.join(", ")}) VALUES (${marcadores})
     ON CONFLICT(id) DO UPDATE SET ${atualizacoes}`,
    valores
  );
}

export function lerMeta(chave) {
  const [linha] = consultar("SELECT valor FROM meta WHERE chave = ?", [chave]);
  return linha ? linha.valor : null;
}

export function gravarMeta(chave, valor) {
  executar("INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)", [chave, valor]);
}

export function exportarArquivo() {
  return getDb().export();
}
