import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAddressByCep } from "../services/api";
import "../src_styles/form.css";

export default function FormAdocao1() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const petIdParam = searchParams.get("petId") || "";

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("Distrito Federal");
  const [selectedPetId, setSelectedPetId] = useState(petIdParam);
  const [pets, setPets] = useState([]);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepMessage, setCepMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedPets = localStorage.getItem("cafofo_pets");
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  const handleCepSearch = async () => {
    if (!cep) return;
    setCepLoading(true);
    setCepMessage("");
    try {
      const data = await fetchAddressByCep(cep);
      setEndereco(data.logradouro || "");
      setCidade(data.cidade || "");
      setEstado(data.uf || "Distrito Federal");
      setCepMessage("Endereço localizado com sucesso.");
    } catch (err) {
      setCepMessage(`❌ ${err.message}`);
    } finally {
      setCepLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    if (!nome || !sobrenome || !email || !telefone || !endereco) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const tempData = {
      nome: `${nome} ${sobrenome}`,
      email,
      telefone,
      cep,
      endereco: `${endereco}${complemento ? ` (${complemento})` : ""}, ${cidade} - ${estado}`,
      petId: selectedPetId || (pets.length > 0 ? pets[0].id : "1")
    };

    localStorage.setItem("cafofo_adocao_temp", JSON.stringify(tempData));
    navigate("/formulario-adocao-2");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "750px" }}>
      <h2 className="text-center mb-3" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
        Formulário de Interesse em Adoção (Etapa 1 de 2)
      </h2>
      <p className="text-center text-muted mb-4 small">
        Preencha seus dados para iniciarmos o processo de adoção responsável.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleNext} className="p-4 bg-white rounded shadow-sm border">
        {/* Seleção do Pet */}
        <div className="form-group mb-3">
          <label className="font-weight-bold text-secondary">Animal que você deseja adotar:</label>
          <select
            className="form-control"
            value={selectedPetId}
            onChange={(e) => setSelectedPetId(e.target.value)}
          >
            {pets.length === 0 ? (
              <option value="">Nenhum pet cadastrado no momento</option>
            ) : (
              pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({p.tipo || "Pet"} - {p.idade})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="font-weight-bold">Nome *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">Sobrenome *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Seu sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="font-weight-bold">E-mail *</label>
            <input
              type="email"
              className="form-control"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">Telefone / WhatsApp *</label>
            <input
              type="text"
              className="form-control"
              placeholder="(61) 98888-8888"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="p-3 mb-3 bg-light rounded border">
          <label className="font-weight-bold text-secondary">
            Endereço Residencial
          </label>
          <div className="row g-2 align-items-center mb-2">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Digite seu CEP (ex: 70040-010)"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepSearch}
              />
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleCepSearch}
                disabled={cepLoading || !cep}
              >
                {cepLoading ? "Consultando..." : "🔍 Buscar CEP"}
              </button>
            </div>
          </div>

          {cepMessage && (
            <div className="small font-weight-bold mb-2 text-info">{cepMessage}</div>
          )}

          <div className="form-group mb-2">
            <label className="small text-muted">Logradouro / Rua *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Rua das Flores, Quadra 10"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label className="small text-muted">Complemento</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apto, Casa, Bloco..."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-7 mb-2">
              <label className="small text-muted">Cidade</label>
              <input
                type="text"
                className="form-control"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="col-md-5 mb-2">
              <label className="small text-muted">Estado / UF</label>
              <input
                type="text"
                className="form-control"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn text-white w-50 py-2 shadow-sm font-weight-bold"
            style={{ backgroundColor: "rgb(235, 167, 104)", borderRadius: "20px" }}
          >
            Avançar para Etapa 2 →
          </button>
        </div>
      </form>
    </div>
  );
}
