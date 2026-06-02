import { Link } from "react-router-dom";
import "../src_styles/css1.css";

const pets = [
  { nome: "Alex", img: "/img/alex.png", idade: "6 meses", desc: "Alex é o explorador do grupo!" },
  { nome: "Sicha", img: "/img/sicha.png", idade: "3 meses", desc: "Sicha é pura fofura! Meiga e carinhosa, ela adora um carinho!" },
  { nome: "Mel", img: "/img/Mel.png", idade: "8 Meses", desc: "Mel é um encanto! Alegre e delicada." },
  { nome: "Rosa", img: "/img/Rosa.png", idade: "1 ano", desc: "Rosa é um amor!" },
  { nome: "Bob", img: "/img/bob.png", idade: "10 meses", desc: "Bob é muito animado, tem muita energia pra gastar!" },
  { nome: "Will", img: "/img/Will.png", idade: "2 anos", desc: "Will é o introvertido do grupo!" },
  { nome: "Chavosa", img: "/img/chavosa.png", idade: "3 anos", desc: "Chavosa é extremamente fofa e estilosa!" },
  { nome: "Leo", img: "/img/Leo.png", idade: "6 meses", desc: "Leo adora brincar com os outros gatos, super extrovertido!" },
  { nome: "João", img: "/img/Joao.png", idade: "10 meses", desc: "João é muito animado, tem muita energia pra gastar!" },
  { nome: "3 Marias", img: "/img/marias.png", idade: "1 ano", desc: "As Marias são irmãs que cresceram juntas e não podem se separar!" },
  { nome: "Melo", img: "/img/melo.png", idade: "3 anos", desc: "Caramelo mais divertido de todos!" },
  { nome: "Let", img: "/img/let.png", idade: "6 meses", desc: "Let adora brincar com os outros gatos, super extrovertido!" },
];

function QueroAdotar() {
  return (
    <>
      <br />
      <div className="alert alert-info" role="alert">
        <h1 className="h1c">Campanha de adoção</h1>
        <p>
          No Cafofo dos Peludos, acreditamos que cada animal merece uma chance de ser amado. Somos um abrigo dedicado a acolher aqueles que não tiveram um começo fácil, mas que, com o apoio de pessoas como você, podem encontrar um novo lar e um futuro cheio de carinho.
        </p>
        <p>
          Nosso objetivo é criar um mundo onde todos os animais tenham um lar seguro e cheio de amor. Junte-se a nós nessa missão!
        </p>
      </div>

      <h3>Pets disponíveis</h3>
      <br />

      <div className="container">
        {pets.map((pet, index) => (
          <div className="card" key={index}>
            <img className="card-img-top" src={pet.img} alt={pet.nome} />
            <div className="card-body">
              <h5 className="card-title">{pet.nome}</h5>
              <p className="card-text">
                {pet.idade}, Brasília DF,<br />
                {pet.desc}
              </p>
              <Link to="/termo-adocao" className="btn btn-info">
                Quero Adotar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default QueroAdotar;
