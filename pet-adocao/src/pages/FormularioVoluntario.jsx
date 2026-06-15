import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src_styles/qp.css";
import "../src_styles/BN.css";
import "../src_styles/css.css";

export default function FormularioVoluntario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("18");
  const [endereco, setEndereco] = useState("");
  const [tempo, setTempo] = useState("Manhã");
  const [genero, setGenero] = useState("Homem");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nome || !telefone || !email || !endereco) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const saved = localStorage.getItem("cafofo_volunteers");
    const list = saved ? JSON.parse(saved) : [];

    const newVol = {
      id: Date.now().toString(),
      nome,
      telefone,
      email,
      idade,
      endereco,
      tempo,
      genero
    };

    list.push(newVol);
    localStorage.setItem("cafofo_volunteers", JSON.stringify(list));
    navigate("/confirmacao-voluntario");
  };

  return (
    <>
      <h1 className="h1qf">Seja Nosso Voluntário!!!</h1>

      {error && <div className="alert alert-danger mx-auto" style={{ maxWidth: "80%" }}>{error}</div>}

      <form className="formq" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            Nome
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="col">
            Telefone
            <input
              type="text"
              className="form-control"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group my-3">
          <label htmlFor="emailVoluntario">Endereço de email</label>
          <input
            type="email"
            className="form-control"
            id="emailVoluntario"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="idadeSelect">Selecione sua idade</label>
          <select
            className="form-control"
            id="idadeSelect"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          >
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

        <div className="row2 my-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="inputAddressVol">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="inputAddressVol"
                placeholder="Rua dos Bobos, nº 0"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>

            <div className="row my-3">
              <legend className="col-form-label col-sm-4 pt-0">Tempo disponível</legend>
              <div className="col-sm-8">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tempoRadios"
                    id="tempoRadio1"
                    value="Manhã"
                    checked={tempo === "Manhã"}
                    onChange={(e) => setTempo(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="tempoRadio1">Manhã</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tempoRadios"
                    id="tempoRadio2"
                    value="Tarde"
                    checked={tempo === "Tarde"}
                    onChange={(e) => setTempo(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="tempoRadio2">Tarde</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tempoRadios"
                    id="tempoRadio3"
                    value="Noite"
                    checked={tempo === "Noite"}
                    onChange={(e) => setTempo(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="tempoRadio3">Noite</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-inline col-md-6 mt-3">
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Gênero</label>
            <select
              className="custom-select my-1 mr-sm-2 form-control"
              id="inlineFormCustomSelectPref"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="Homem">Homem</option>
              <option value="Mulher">Mulher</option>
              <option value="Outro">Outro</option>
            </select>
            <br />

            <button type="submit" className="btn btn-primary my-3" id="butaof">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
