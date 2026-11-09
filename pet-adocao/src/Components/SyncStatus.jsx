import { Link } from "react-router-dom";
import { useEstadoSync } from "../hooks/useBancoLocal";
import { sincronizar } from "../services/syncService";
import { useAuth } from "../context/AuthContext";

function formatarHora(iso) {
  if (!iso) return "nunca";
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function SyncStatus() {
  const { online, sincronizando, pendentes, ultimaSincronizacao, erro, simulado } = useEstadoSync();
  const { user } = useAuth();

  let cor = "#d4edda";
  let texto = "🟢 Online — dados sincronizados";
  if (!online) {
    cor = "#f8d7da";
    texto = "🔴 Sem internet — salvando no SQLite local";
  } else if (sincronizando) {
    cor = "#fff3cd";
    texto = "🔄 Sincronizando com a nuvem...";
  } else if (erro) {
    cor = "#fff3cd";
    texto = `⚠️ Erro ao sincronizar: ${erro}`;
  } else if (pendentes > 0) {
    cor = "#fff3cd";
    texto = "🟡 Online — há dados aguardando envio";
  }

  return (
    <div
      className="d-flex flex-wrap align-items-center justify-content-between px-3 py-1 small border-bottom"
      style={{ backgroundColor: cor, gap: "8px" }}
    >
      <span className="font-weight-bold">{texto}</span>
      <span className="d-flex flex-wrap align-items-center" style={{ gap: "12px" }}>
        <span>
          Pendentes: <strong>{pendentes}</strong>
        </span>
        <span>Última sincronização: {formatarHora(ultimaSincronizacao)}</span>
        {simulado && <span className="badge badge-secondary">Firestore simulado</span>}
        {user && (
          <Link to="/banco-local" className="btn btn-sm btn-outline-dark py-0">
            Ver SQLite
          </Link>
        )}
        <button
          className="btn btn-sm btn-dark py-0"
          onClick={() => sincronizar()}
          disabled={!online || sincronizando}
        >
          Sincronizar agora
        </button>
      </span>
    </div>
  );
}
