import { useState, useEffect } from "react";

export default function Relatorio() {
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  useEffect(() => {
    const savedAdoptions = localStorage.getItem("cafofo_adoptions")
      ? JSON.parse(localStorage.getItem("cafofo_adoptions"))
      : [];
    const savedPets = localStorage.getItem("cafofo_pets")
      ? JSON.parse(localStorage.getItem("cafofo_pets"))
      : [];
    const savedVolunteers = localStorage.getItem("cafofo_volunteers")
      ? JSON.parse(localStorage.getItem("cafofo_volunteers"))
      : [];

    const joined = savedAdoptions.map((a) => {
      const pet = savedPets.find((p) => p.id === a.petId) || {};
      const volunteer = savedVolunteers.find((v) => v.id === a.volunteerId) || {};

      return {
        id: a.id,
        petNome: pet.nome || "Não encontrado",
        petTipo: pet.tipo || "Gato/Cachorro",
        adotanteNome: volunteer.nome || "Não encontrado",
        adotanteEmail: volunteer.email || "Não encontrado",
        adotanteTelefone: volunteer.telefone || "Não encontrado",
        data: a.data,
        status: a.status
      };
    });

    setReportData(joined);
  }, []);

  const filteredData = reportData.filter((item) => {
    const matchesSearch =
      item.petNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adotanteNome.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Todos" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
        Relatório Consolidado de Adoções (JOIN entre Entidades)
      </h2>

      <div className="card shadow-sm border-0 p-4 mb-4" style={{ borderRadius: "15px" }}>
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <label>Filtrar por Pet ou Adotante</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite o nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label>Filtrar por Status</label>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Aprovada">Aprovada</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0 bg-white">
          <thead className="bg-light text-secondary">
            <tr>
              <th>Adotante</th>
              <th>E-mail / Telefone</th>
              <th>Pet</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  Nenhum registro encontrado para a busca.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.adotanteNome}</strong>
                  </td>
                  <td>
                    <div>{item.adotanteEmail}</div>
                    <small className="text-muted">{item.adotanteTelefone}</small>
                  </td>
                  <td>{item.petNome}</td>
                  <td>{item.petTipo}</td>
                  <td>{item.data}</td>
                  <td>
                    <span className={`badge badge-${
                      item.status === "Aprovada" ? "success" : item.status === "Pendente" ? "warning" : "secondary"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
