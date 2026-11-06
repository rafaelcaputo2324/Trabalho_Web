import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddressByCep } from "../services/api";
import "../src_styles/qp.css";
import "../src_styles/BN.css";
import "../src_styles/css.css";

export default function FormularioVoluntario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("18");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [tempo, setTempo] = useState("Manhã");
  const [genero, setGenero] = useState("Homem");
  const [error, setError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepMessage, setCepMessage] = useState("");

  const navigate = useNavigate();

  // Consulta à API ViaCEP
  const handleCepSearch = async () => {
    if (!cep) return;
    setCepLoading(true);
    setCepMessage("");
    try {
      const data = await fetchAddressByCep(cep);
      setEndereco(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(`${data.cidade} - ${data.uf}`);
      setCepMessage("Endereço localizado com sucesso.");
    } catch (err) {
      setCepMessage(`❌ ${err.message}`);
    } finally {
      setCepLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nome || !telefone || !email || !endereco) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const saved = localStorage.getItem("cafofo_volunteers");
    const list = saved ? JSON.parse(saved) : [];

    const fullEndereco = bairro || cidade ? `${endereco}, ${bairro} - ${cidade}` : endereco;

    const newVol = {
      id: Date.now().toString(),
      nome,
      telefone,
      email,
      idade,
      cep,
      endereco: fullEndereco,
      tempo,
      genero
    };

    list.push(newVol);
    localStorage.setItem("cafofo_volunteers", JSON.stringify(list));
    navigate("/confirmacao-voluntario");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm border-0 p-4 bg-white rounded">
        <h1 className="h1qf text-center mb-4">Seja Nosso Voluntário!</h1>
        <p className="text-center text-muted small">
          Junte-se à equipe do Cafofo dos Peludos e ajude a transformar a vida de animais resgatados.
        </p>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label font-weight-bold">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label font-weight-bold">Telefone / WhatsApp</label>
              <input
                type="text"
                className="form-control"
                placeholder="(61) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="emailVoluntario" className="font-weight-bold">Endereço de E-mail</label>
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

          <div className="form-group mb-3">
            <label htmlFor="idadeSelect" className="font-weight-bold">Selecione sua idade</label>
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

          <div className="p-3 mb-3 bg-light rounded border">
            <label className="font-weight-bold text-secondary">
              Endereço / Localização
            </label>
            <div className="row g-2 align-items-center mb-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite seu CEP (ex: 70040-010)"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={handleCepSearch}
                />
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={handleCepSearch}
                  disabled={cepLoading || !cep}
                >
                  {cepLoading ? "Buscando..." : "Buscar CEP"}
                </button>
              </div>
            </div>

            {cepMessage && (
              <div className="small font-weight-bold mb-2 text-info">
                {cepMessage}
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="small text-muted">Logradouro / Rua</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rua, Avenida..."
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="small text-muted">Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-2">
                <label className="small text-muted">Cidade / UF</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cidade - UF"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label d-block font-weight-bold">Disponibilidade</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tempoRadios"
                  id="tempoManha"
                  value="Manhã"
                  checked={tempo === "Manhã"}
                  onChange={(e) => setTempo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="tempoManha">
                  Manhã
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tempoRadios"
                  id="tempoTarde"
                  value="Tarde"
                  checked={tempo === "Tarde"}
                  onChange={(e) => setTempo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="tempoTarde">
                  Tarde
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tempoRadios"
                  id="tempoIntegral"
                  value="Integral"
                  checked={tempo === "Integral"}
                  onChange={(e) => setTempo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="tempoIntegral">
                  Integral
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label d-block font-weight-bold">Gênero</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="generoRadios"
                  id="generoHomem"
                  value="Homem"
                  checked={genero === "Homem"}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label className="form-check-label" htmlFor="generoHomem">
                  Homem
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="generoRadios"
                  id="generoMulher"
                  value="Mulher"
                  checked={genero === "Mulher"}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label className="form-check-label" htmlFor="generoMulher">
                  Mulher
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="generoRadios"
                  id="generoOutro"
                  value="Outro"
                  checked={genero === "Outro"}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <label className="form-check-label" htmlFor="generoOutro">
                  Outro
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-warning text-white btn-lg px-5 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              Enviar Inscrição de Voluntário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
