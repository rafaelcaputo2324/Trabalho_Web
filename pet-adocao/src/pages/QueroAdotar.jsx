import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../src_styles/css1.css";

const initialPets = [
  { id: "1", nome: "Alex", img: "/img/alex.png", idade: "6 meses", desc: "Alex é o explorador do grupo!" },
  { id: "2", nome: "Sicha", img: "/img/sicha.png", idade: "3 meses", desc: "Sicha é pura fofura! Meiga e carinhosa, ela adora um carinho!" },
  { id: "3", nome: "Mel", img: "/img/Mel.png", idade: "8 Meses", desc: "Mel é um encanto! Alegre e delicada." },
  { id: "4", nome: "Rosa", img: "/img/Rosa.png", idade: "1 ano", desc: "Rosa é um amor!" },
  { id: "5", nome: "Bob", img: "/img/bob.png", idade: "10 meses", desc: "Bob é muito animado, tem muita energia pra gastar!" },
  { id: "6", nome: "Will", img: "/img/Will.png", idade: "2 anos", desc: "Will é o introvertido do grupo!" },
  { id: "7", nome: "Chavosa", img: "/img/chavosa.png", idade: "3 anos", desc: "Chavosa é extremamente fofa e estilosa!" },
  { id: "8", nome: "Leo", img: "/img/Leo.png", idade: "6 meses", desc: "Leo adora brincar com os outros gatos, super extrovertido!" },
  { id: "9", nome: "João", img: "/img/Joao.png", idade: "10 meses", desc: "João é muito animado, tem muita energia pra gastar!" },
  { id: "10", nome: "3 Marias", img: "/img/marias.png", idade: "1 ano", desc: "As Marias são irmãs que cresceram juntas e não podem se separar!" },
  { id: "11", nome: "Melo", img: "/img/melo.png", idade: "3 anos", desc: "Caramelo mais divertido de todos!" },
  { id: "12", nome: "Let", img: "/img/let.png", idade: "6 meses", desc: "Let adora brincar com os outros gatos, super extrovertido!" }
];

export default function QueroAdotar() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedPets = localStorage.getItem("cafofo_pets");
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      localStorage.setItem("cafofo_pets", JSON.stringify(initialPets));
      setPets(initialPets);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este pet?")) {
      const updated = pets.filter((pet) => pet.id !== id);
      setPets(updated);
      localStorage.setItem("cafofo_pets", JSON.stringify(updated));
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

      <div className="container">
        {pets.map((pet) => (
          <div className="card" key={pet.id}>
            <img className="card-img-top" src={pet.img || "/img/logo1.png"} alt={pet.nome} style={{ objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title">{pet.nome}</h5>
              <p className="card-text">
                {pet.idade}, Brasília DF,<br />
                {pet.desc}
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-between">
                <Link to="/termo-adocao" className="btn btn-info btn-sm">
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
