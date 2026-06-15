import { Link } from "react-router-dom";
import "../src_styles/form2.css";

export default function FormAdocao2() {
  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm border-0 p-4 bg-white rounded">
        <div className="text mb-4">
          <h2 className="text-center mb-4">Explique por que você deseja adotar um animal:</h2>
          <textarea
            id="motivo-adocao"
            name="motivo-adocao"
            placeholder="Escreva aqui sua resposta..."
            rows="6"
            className="form-control"
          ></textarea>
        </div>

        <div className="text-center">
          <Link to="/confirmacao-adocao" className="btn text-white w-50" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
            Enviar
          </Link>
        </div>
      </div>
    </div>
  );
}
