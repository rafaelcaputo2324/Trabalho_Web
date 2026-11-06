import { useState, useEffect } from "react";

const initialAdoptions = [
  { id: "1", petId: "1", volunteerId: "1", data: "2026-06-15", status: "Aprovada" }
];

export default function GerenciarAdocoes() {
  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [petId, setPetId] = useState("");
  const [volunteerId, setVolunteerId] = useState("");
  const [dataAdocao, setDataAdocao] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedAdoptions = localStorage.getItem("cafofo_adoptions");
    if (savedAdoptions) {
      setAdoptions(JSON.parse(savedAdoptions));
    } else {
      localStorage.setItem("cafofo_adoptions", JSON.stringify(initialAdoptions));
      setAdoptions(initialAdoptions);
    }

    const savedPets = localStorage.getItem("cafofo_pets");
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }

    const savedVolunteers = localStorage.getItem("cafofo_volunteers");
    if (savedVolunteers) {
      setVolunteers(JSON.parse(savedVolunteers));
    }
  }, []);

  const saveToLocalStorage = (list) => {
    setAdoptions(list);
    localStorage.setItem("cafofo_adoptions", JSON.stringify(list));
  };

  const clearForm = () => {
    setPetId("");
    setVolunteerId("");
    setDataAdocao("");
    setStatus("Pendente");
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!petId || !volunteerId || !dataAdocao) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (editingId) {
      const updated = adoptions.map((a) =>
        a.id === editingId
          ? { ...a, petId, volunteerId, data: dataAdocao, status }
          : a
      );
      saveToLocalStorage(updated);
    } else {
      const newAdocao = {
        id: Date.now().toString(),
        petId,
        volunteerId,
        data: dataAdocao,
        status
      };
      saveToLocalStorage([...adoptions, newAdocao]);
    }
    clearForm();
  };

  const handleEdit = (adocao) => {
    setEditingId(adocao.id);
    setPetId(adocao.petId);
    setVolunteerId(adocao.volunteerId);
    setDataAdocao(adocao.data);
    setStatus(adocao.status);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este registro de adoção?")) {
      const filtered = adoptions.filter((a) => a.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  const getPetName = (id) => {
    const pet = pets.find((p) => p.id === id);
    return pet ? pet.nome : "Desconhecido";
  };

  const getAdopterName = (id) => {
    const vol = volunteers.find((v) => v.id === id);
    return vol ? vol.nome : "Desconhecido";
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
        Gerenciamento de Adoções
      </h2>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "15px" }}>
            <h4 className="mb-3">{editingId ? "Editar Adoção" : "Nova Adoção"}</h4>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label>Pet</label>
                <select
                  className="form-control form-control-sm"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  required
                >
                  <option value="">Selecione um Pet</option>
                  {pets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.idade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label>Adotante (Voluntário)</label>
                <select
                  className="form-control form-control-sm"
                  value={volunteerId}
                  onChange={(e) => setVolunteerId(e.target.value)}
                  required
                >
                  <option value="">Selecione o Adotante</option>
                  {volunteers.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label>Data</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={dataAdocao}
                  onChange={(e) => setDataAdocao(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Status</label>
                <select
                  className="form-control form-control-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Aprovada">Aprovada</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary btn-sm mr-2">
                  {editingId ? "Salvar" : "Registrar"}
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
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="bg-light text-secondary">
                <tr>
                  <th>Pet</th>
                  <th>Adotante</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {adoptions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Nenhuma adoção registrada.
                    </td>
                  </tr>
                ) : (
                  adoptions.map((a) => (
                    <tr key={a.id}>
                      <td>{getPetName(a.petId)}</td>
                      <td>{getAdopterName(a.volunteerId)}</td>
                      <td>{a.data}</td>
                      <td>
                        <span className={`badge badge-${
                          a.status === "Aprovada" ? "success" : a.status === "Pendente" ? "warning" : "secondary"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(a)}
                          className="btn btn-sm btn-outline-warning mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
