import { Link } from "react-router-dom";
import "../src_styles/form.css";

function FormAdocao1() {
  return (
    <>
      <br /><br />
      <h2> Queremos saber mais sobre você</h2>

      <form>
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
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputCEP">CEP</label>
            <input type="text" className="form-control" id="inputCEP" />
          </div>
        </div>

        <Link to="/formulario-adocao-2" className="but">
          Confirmar
        </Link>
      </form>
    </>
  );
}

export default FormAdocao1;
