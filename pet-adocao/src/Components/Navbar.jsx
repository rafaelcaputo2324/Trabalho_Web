import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logo1.png" alt="Cafofo dos Peludos" height="48" className="mr-2" />
          <span style={{ fontFamily: "'Baloo', cursive", fontSize: "1.25rem", color: "#6f42c1" }}>
            Cafofo dos Peludos
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#conteudoNavbarSuportado"
          aria-controls="conteudoNavbarSuportado"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-primary font-weight-bold" to="/guia-racas">
                🐶 Guia de Raças
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownInstitucional"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Painel Administrativo
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownInstitucional">
                {user ? (
                  <>
                    <h6 className="dropdown-header text-uppercase text-secondary font-weight-bold">
                      Gestão
                    </h6>
                    <Link className="dropdown-item" to="/gerenciar-pets">
                      🐾 Gerenciar Pets
                    </Link>
                    <Link className="dropdown-item" to="/adicionar-pet">
                      ➕ Cadastrar Pet
                    </Link>
                    <Link className="dropdown-item" to="/gerenciar-voluntarios">
                      👥 Gerenciar Voluntários
                    </Link>
                    <Link className="dropdown-item" to="/gerenciar-adocoes">
                      📋 Gerenciar Adoções
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/relatorio">
                      📊 Relatório Consolidado
                    </Link>
                    <div className="dropdown-divider"></div>
                  </>
                ) : (
                  <div className="px-3 py-1 small text-muted">
                    Faça login para gerenciar o sistema.
                  </div>
                )}
                <a
                  className="dropdown-item"
                  href="https://observatorio3setor.org.br/lista-conheca-7-ongs-brasileiras-que-atuam-na-protecao-de-animais/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Projetos sociais parceiros
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownFaq"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Ajuda
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownFaq">
                <Link className="dropdown-item" to="/faq">Como Ajudar / FAQ</Link>
              </div>
            </li>
          </ul>

          <div className="d-flex align-items-center flex-wrap gap-2">
            <Link to="/quero-adotar" className="btn btn-outline-info mr-2 btn-sm">
              Quero Adotar
            </Link>
            <Link to="/seja-voluntario" className="btn btn-outline-warning mr-3 btn-sm">
              Seja Voluntário
            </Link>

            {user ? (
              <div className="d-flex align-items-center bg-white border rounded px-2 py-1 shadow-sm">
                <span className="badge badge-success mr-2">Admin</span>
                <span className="text-secondary small font-weight-bold mr-2" style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.email}
                </span>
                <button
                  className="btn btn-danger btn-sm py-0 px-2"
                  onClick={logout}
                  title="Encerrar sessão"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm text-white"
                style={{ backgroundColor: "#6f42c1" }}
              >
                🔐 Entrar / Cadastrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
