import { Link } from "react-router-dom";
import "../src_styles/qp.css";
import "../src_styles/BN.css";
import "../src_styles/css.css";

function FormularioVoluntario() {
  return (
    <>
      <h1 className="h1qf">Seja Nosso Voluntário!!!</h1>

      <form className="formq">
        <div className="row">
          <div className="col">
            Nome
            <input type="text" className="form-control" placeholder="Nome" />
          </div>
          <div className="col">
            Telefone
            <input type="text" className="form-control" placeholder="Telefone" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="emailVoluntario">Endereço de email</label>
          <input type="email" className="form-control" id="emailVoluntario" placeholder="nome@exemplo.com" />
        </div>

        <div className="form-group">
          <label htmlFor="idadeSelect">Selecione sua idade</label>
          <select className="form-control" id="idadeSelect">
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>Mais de 30</option>
            <option>Mais de 45</option>
            <option>Mais de 60</option>
          </select>
        </div>

        <div className="row2">
          <div className="col">
            <div className="form-group">
              <label htmlFor="inputAddressVol">Endereço</label>
              <input type="text" className="form-control" id="inputAddressVol" placeholder="Rua dos Bobos, nº 0" />
            </div>

            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Tempo disponível</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="opcao1" defaultChecked />
                  <label className="form-check-label" htmlFor="gridRadios1">Manhã</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="opcao2" />
                  <label className="form-check-label" htmlFor="gridRadios2">Tarde</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="opcao3" />
                  <label className="form-check-label" htmlFor="gridRadios3">Noite</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-inline">
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Gênero</label>
            <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
              <option defaultValue>Homem</option>
              <option value="1">Mulher</option>
              <option value="2">Outro</option>
            </select>
            <br />

            <Link to="/confirmacao-voluntario" className="btn btn-primary my-1" id="butaof">
              Enviar
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormularioVoluntario;
