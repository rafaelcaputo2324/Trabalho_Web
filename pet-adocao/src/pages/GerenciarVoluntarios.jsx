import { useState } from "react";
import ReusableTable from "../Components/ReusableTable";
import { fetchAddressByCep } from "../services/api";
import { useTabela } from "../hooks/useBancoLocal";
import { inserir, atualizar, excluir } from "../services/repositorio";

export default function GerenciarVoluntarios() {
  const volunteers = useTabela("voluntarios");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("18");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tempo, setTempo] = useState("Manhã");
  const [genero, setGenero] = useState("Homem");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCepSearch = async () => {
    if (!cep) return;
    setCepLoading(true);
    try {
      const data = await fetchAddressByCep(cep);
      setEndereco(`${data.logradouro}, ${data.bairro} - ${data.cidade}/${data.uf}`);
    } catch (err) {
      alert(`Erro na busca do CEP: ${err.message}`);
    } finally {
      setCepLoading(false);
    }
  };

  const clearForm = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setIdade("18");
    setCep("");
    setEndereco("");
    setTempo("Manhã");
    setGenero("Homem");
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nome || !telefone || !email || !endereco) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const dados = { nome, telefone, email, idade, cep, endereco, tempo, genero };
    if (editingId) {
      atualizar("voluntarios", editingId, dados);
    } else {
      inserir("voluntarios", dados);
    }
    clearForm();
  };

  const handleEdit = (vol) => {
    setEditingId(vol.id);
    setNome(vol.nome);
    setTelefone(vol.telefone);
    setEmail(vol.email);
    setIdade(vol.idade);
    setCep(vol.cep || "");
    setEndereco(vol.endereco);
    setTempo(vol.tempo);
    setGenero(vol.genero);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este voluntário?")) {
      excluir("voluntarios", id);
    }
  };

  const filteredVolunteers = volunteers.filter((v) =>
    v.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
        Gerenciamento de Voluntários
      </h2>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "15px" }}>
            <h4 className="mb-3 font-weight-bold text-primary">
              {editingId ? "Editar Voluntário" : "Novo Voluntário"}
            </h4>
            {error && <div className="alert alert-danger py-1 small">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="small font-weight-bold">Nome *</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="small font-weight-bold">Telefone *</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(61) 99999-9999"
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="small font-weight-bold">E-mail *</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="small font-weight-bold text-secondary">CEP</label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={handleCepSearch}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCepSearch}
                    disabled={cepLoading || !cep}
                  >
                    {cepLoading ? "..." : "Buscar"}
                  </button>
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="small font-weight-bold">Endereço *</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, Bairro, Cidade"
                  required
                />
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="small font-weight-bold">Disponibilidade</label>
                  <select
                    className="form-control form-control-sm"
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                  >
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Integral">Integral</option>
                    <option value="Adotante">Adotante</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="small font-weight-bold">Gênero</label>
                  <select
                    className="form-control form-control-sm"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <option value="Homem">Homem</option>
                    <option value="Mulher">Mulher</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-primary btn-sm flex-fill">
                  {editingId ? "Salvar" : "Cadastrar"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={clearForm}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar voluntário por nome, email ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ReusableTable
            headers={["Nome", "Telefone", "E-mail", "Endereço", "Turno", "Gênero"]}
            data={filteredVolunteers}
            keys={["nome", "telefone", "email", "endereco", "tempo", "genero"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
