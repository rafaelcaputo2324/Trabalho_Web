import { Link } from "react-router-dom";
import "../src_styles/qp.css";
import "../src_styles/BN.css";
import "../src_styles/css.css";

export default function SejaVoluntarioInfo() {
  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <div className="alert alert-info text-center" role="alert">
        <h1 className="mb-0">Quer ser nosso parceiro?</h1>
      </div>

      <div className="p1 bg-white p-4 rounded shadow-sm">
        <p className="text-justify mb-4">
          O objetivo de programas Cafofo dos peludos é proporcionar uma segunda chance para animais abandonados, oferecendo-lhes um novo lar, amor e cuidados adequados. Esses programas visam conectar pessoas responsáveis com animais que precisam de um lar seguro, ajudando a reduzir a superpopulação de animais em abrigos e nas ruas. Além disso, eles promovem a conscientização sobre a importância da adoção responsável, incentivando a esterilização e combatendo o abandono. Ao adotar um pet, os adotantes não apenas salvam vidas, mas também ganham um companheiro fiel, contribuindo para uma sociedade mais solidária e ética em relação aos animais. A adoção de pets também oferece benefícios emocionais aos humanos, como redução do estresse e aumento do bem-estar, criando um vínculo de amor e confiança.
        </p>
        <p className="text-center font-weight-bold mb-3">Agora preencha nosso formulário</p>
        <div className="text-center">
          <Link to="/formulario-voluntario" className="btn btn-info px-4 py-2">
            Vem ser nosso voluntário
          </Link>
        </div>
      </div>
    </div>
  );
}
