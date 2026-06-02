import { Link } from "react-router-dom";
import "../src_styles/qp.css";
import "../src_styles/BN.css";
import "../src_styles/css.css";

function SejaVoluntarioInfo() {
  return (
    <>
      <div className="alert alert-info" role="alert">
        <h1>Quer ser nosso parceiro?</h1>
      </div>

      <div className="p1">
        <p>
          O objetivo de programas Cafofo dos peludos é proporcionar uma segunda chance para animais abandonados, oferecendo-lhes um novo lar, amor e cuidados adequados. Esses programas visam conectar pessoas responsáveis com animais que precisam de um lar seguro, ajudando a reduzir a superpopulação de animais em abrigos e nas ruas. Além disso, eles promovem a conscientização sobre a importância da adoção responsável, incentivando a esterilização e combatendo o abandono. Ao adotar um pet, os adotantes não apenas salvam vidas, mas também ganham um companheiro fiel, contribuindo para uma sociedade mais solidária e ética em relação aos animais. A adoção de pets também oferece benefícios emocionais aos humanos, como redução do estresse e aumento do bem-estar, criando um vínculo de amor e confiança.
        </p>
        <p>Agora preencha nosso formulário</p>
        <Link to="/formulario-voluntario" className="btn btn-info">
          Vem ser nosso voluntário
        </Link>
      </div>
    </>
  );
}

export default SejaVoluntarioInfo;
