import { Link } from "react-router-dom";
import "../src_styles/form2.css";

function FormAdocao2() {
  return (
    <>
      <br /><br /><br /><br /><br /><br />

      <div className="text">
        <h2>Explique por que você deseja adotar um animal:</h2>
        <textarea
          id="motivo-adocao"
          name="motivo-adocao"
          placeholder="Escreva aqui sua resposta..."
          rows="6"
        ></textarea>
      </div>

      <Link to="/confirmacao-adocao" className="but">
        Enviar
      </Link>
    </>
  );
}

export default FormAdocao2;
