import { useState, useEffect } from "react";
import ReusableTable from "../Components/ReusableTable";

const initialVolunteers = [
  { id: "1", nome: "Mariana Silva", telefone: "(61) 98888-8888", email: "mariana@gmail.com", idade: "25", endereco: "Quadra 102 Sul, DF", tempo: "Tarde", genero: "Mulher" },
  { id: "2", nome: "Carlos Souza", telefone: "(61) 97777-7777", email: "carlos@gmail.com", idade: "34", endereco: "Rua das Flores, 12", tempo: "Manhã", genero: "Homem" }
];

export default function GerenciarVoluntarios() {
  const [volunteers, setVolunteers] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("18");
  const [endereco, setEndereco] = useState("");
  const [tempo, setTempo] = useState("Manhã");
  const [genero, setGenero] = useState("Homem");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cafofo_volunteers");
    if (saved) {
      setVolunteers(JSON.parse(saved));
    } else {
      localStorage.setItem("cafofo_volunteers", JSON.stringify(initialVolunteers));
      setVolunteers(initialVolunteers);
    }
  }, []);

  const saveToLocalStorage = (list) => {
    setVolunteers(list);
    localStorage.setItem("cafofo_volunteers", JSON.stringify(list));
  };

  const clearForm = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setIdade("18");
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

    if (editingId) {
      const updated = volunteers.map((v) =>
        v.id === editingId
          ? { ...v, nome, telefone, email, idade, endereco, tempo, genero }
          : v
      );
      saveToLocalStorage(updated);
    } else {
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
      saveToLocalStorage([...volunteers, newVol]);
    }
    clearForm();
  };

  const handleEdit = (vol) => {
    setEditingId(vol.id);
    setNome(vol.nome);
    setTelefone(vol.telefone);
    setEmail(vol.email);
    setIdade(vol.idade);
    setEndereco(vol.endereco);
    setTempo(vol.tempo);
    setGenero(vol.genero);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este voluntário?")) {
      const filtered = volunteers.filter((v) => v.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
        Gerenciamento de Voluntários (CRUD 2)
      </h2>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "15px" }}>
            <h4 className="mb-3">{editingId ? "Editar Voluntário" : "Novo Voluntário"}</h4>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Telefone</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>E-mail</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Idade</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Endereço</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Tempo Disponível</label>
                <select
                  className="form-control form-control-sm"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Gênero</label>
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
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary btn-sm mr-2">
                  {editingId ? "Salvar" : "Adicionar"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary btn-sm" onClick={clearForm}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <ReusableTable
            headers={["Nome", "Telefone", "E-mail", "Tempo", "Gênero"]}
            data={volunteers}
            keys={["nome", "telefone", "email", "tempo", "genero"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
