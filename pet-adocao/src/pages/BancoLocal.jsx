import { useState } from "react";
import { useDadosLocais } from "../hooks/useBancoLocal";
import { linhasBrutas } from "../services/repositorio";
import { exportarArquivo, ENTIDADES, SYNC } from "../services/sqlite";

const CORES_STATUS = {
  [SYNC.SINCRONIZADO]: "success",
  [SYNC.PENDENTE]: "warning",
  [SYNC.EXCLUSAO_PENDENTE]: "danger"
};

function resumirValor(valor) {
  if (valor === null || valor === undefined) return <span className="text-muted">NULL</span>;
  const texto = String(valor);
  return texto.length > 40 ? texto.slice(0, 40) + "…" : texto;
}

function TabelaSQLite({ entidade }) {
  const linhas = useDadosLocais(() => linhasBrutas(entidade));
  const colunas = linhas.length > 0 ? Object.keys(linhas[0]) : [];

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-sm table-hover mb-0 bg-white small">
        <thead className="bg-light">
          <tr>
            {colunas.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.length === 0 ? (
            <tr>
              <td className="text-center text-muted py-4">Tabela vazia.</td>
            </tr>
          ) : (
            linhas.map((linha) => (
              <tr key={linha.id}>
                {colunas.map((c) => (
                  <td key={c}>
                    {c === "sync_status" ? (
                      <span className={`badge badge-${CORES_STATUS[linha[c]] || "secondary"}`}>{linha[c]}</span>
                    ) : (
                      resumirValor(linha[c])
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function BancoLocal() {
  const [entidade, setEntidade] = useState("pets");

  const baixarArquivo = () => {
    const blob = new Blob([exportarArquivo()], { type: "application/vnd.sqlite3" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cafofo.sqlite";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3" style={{ gap: "8px" }}>
        <div>
          <h2 style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }} className="mb-1">
            Banco Local (SQLite)
          </h2>
          <span className="text-muted small">
            Conteúdo gravado no dispositivo. A coluna <code>sync_status</code> mostra o que já foi enviado à nuvem.
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={baixarArquivo}>
          ⬇ Baixar arquivo .sqlite
        </button>
      </div>

      <div className="btn-group mb-3">
        {Object.keys(ENTIDADES).map((nome) => (
          <button
            key={nome}
            className={`btn btn-sm ${entidade === nome ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setEntidade(nome)}
          >
            {ENTIDADES[nome].tabela}
          </button>
        ))}
      </div>

      <TabelaSQLite key={entidade} entidade={entidade} />
    </div>
  );
}
