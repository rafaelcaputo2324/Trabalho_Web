import { Link } from "react-router-dom";
import "../src_styles/form.css";

export default function FormAdocao1() {
  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Queremos saber mais sobre você</h2>

      <form className="p-4 bg-white rounded shadow-sm">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputNome">Nome</label>
            <input type="text" className="form-control" id="inputNome" placeholder="Nome" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputSobrenome">Sobrenome</label>
            <input type="text" className="form-control" id="inputSobrenome" placeholder="Sobrenome" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputAddress">Endereço</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0" />
        </div>

        <div className="form-group">
          <label htmlFor="inputAddress2">Endereço 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc." />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Cidade</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputEstado">Estado</label>
            <select id="inputEstado" className="form-control">
              <option defaultValue>Escolher...</option>
              <option>Distrito Federal</option>
              <option>Goiás</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputCEP">CEP</label>
            <input type="text" className="form-control" id="inputCEP" />
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/formulario-adocao-2" className="btn text-white w-50" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
            Confirmar
          </Link>
        </div>
      </form>
    </div>
  );
}
