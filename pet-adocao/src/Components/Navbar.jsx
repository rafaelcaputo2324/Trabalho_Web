import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src="/img/logo1.png" alt="Cafofo dos Peludos" height="50" />
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
              Institucional
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownInstitucional">
              {user && (
                <>
                  <Link className="dropdown-item" to="/adicionar-pet">Adicionar pet</Link>
                  <Link className="dropdown-item" to="/gerenciar-voluntarios">Gerenciar Voluntários</Link>
                  <Link className="dropdown-item" to="/gerenciar-adocoes">Gerenciar Adoções</Link>
                  <Link className="dropdown-item" to="/relatorio">Relatórios (JOIN)</Link>
                  <div className="dropdown-divider"></div>
                </>
              )}
              <a
                className="dropdown-item"
                href="https://observatorio3setor.org.br/lista-conheca-7-ongs-brasileiras-que-atuam-na-protecao-de-animais/"
                target="_blank"
                rel="noreferrer"
              >
                Projetos sociais
              </a>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              href="https://love.doghero.com.br/dicas/ong-de-animais/"
              target="_blank"
              rel="noreferrer"
            >
              ONGs parceiras
            </a>
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
              FAQ
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownFaq">
              <Link className="dropdown-item" to="/faq">Como ajudar</Link>
            </div>
          </li>
        </ul>

        <Link to="/quero-adotar" className="btn btn-outline-info mr-2">
          Quero adotar
        </Link>
        <Link to="/seja-voluntario" className="btn btn-outline-warning mr-3">
          Seja voluntário
        </Link>

        {user ? (
          <div className="d-flex align-items-center">
            <span className="text-muted mr-3">{user.email}</span>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline-primary btn-sm">
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;