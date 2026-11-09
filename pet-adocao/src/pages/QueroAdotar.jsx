import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTabela } from "../hooks/useBancoLocal";
import { excluir } from "../services/repositorio";
import "../src_styles/css1.css";

export default function QueroAdotar() {
  const pets = useTabela("pets");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este pet?")) {
      excluir("pets", id);
    }
  };

  return (
    <>
      <br />
      <div className="alert alert-info mr-3 ml-3" role="alert">
        <h1 className="h1c">Campanha de adoção</h1>
        <p>
          No Cafofo dos Peludos, acreditamos que cada animal merece uma chance de ser amado. Somos um abrigo dedicado a acolher aqueles que não tiveram um começo fácil, mas que, com o apoio de pessoas como você, podem encontrar um novo lar e um futuro cheio de carinho.
        </p>
        <p>
          Nosso objetivo é criar um mundo onde todos os animais tenham um lar seguro e cheio de amor. Junte-se a nós nessa missão!
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Pets disponíveis</h3>
        {user && (
          <Link to="/adicionar-pet" className="btn btn-success">
            + Cadastrar Novo Pet
          </Link>
        )}
      </div>
      <br />

      <div className="pet-container">
        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <img className="card-img-top" src={pet.img || "/img/logo1.png"} alt={pet.nome} style={{ objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title">{pet.nome}</h5>
              <p className="card-text">
                {pet.idade}, Brasília DF,<br />
                {pet.desc}
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-between">
                <Link to={`/formulario-adocao-1?petId=${pet.id}`} className="btn btn-info btn-sm">
                  Quero Adotar
                </Link>
                {user && (
                  <div className="mt-2 w-100 d-flex justify-content-between">
                    <button
                      onClick={() => navigate(`/adicionar-pet?id=${pet.id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
