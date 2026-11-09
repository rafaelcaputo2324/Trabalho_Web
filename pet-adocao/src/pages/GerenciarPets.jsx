import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReusableTable from "../Components/ReusableTable";
import { useTabela } from "../hooks/useBancoLocal";
import { excluir } from "../services/repositorio";

export default function GerenciarPets() {
  const pets = useTabela("pets");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("Todos");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente remover este pet do sistema?")) {
      excluir("pets", id);
    }
  };

  const handleEdit = (pet) => {
    navigate(`/adicionar-pet?id=${pet.id}`);
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pet.desc && pet.desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pet.raca && pet.raca.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTipo = filterTipo === "Todos" || (pet.tipo || "Cachorro") === filterTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }} className="mb-1">
            Gerenciamento de Animais
          </h2>
          <span className="text-muted small">
            Lista e controle dos pets cadastrados para adoção.
          </span>
        </div>
        <Link to="/adicionar-pet" className="btn btn-success shadow-sm font-weight-bold">
          + Cadastrar Pet
        </Link>
      </div>

      <div className="card shadow-sm border-0 p-3 mb-4 bg-light rounded">
        <div className="row align-items-center">
          <div className="col-md-7 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome, raça ou característica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-5 d-flex gap-2 align-items-center">
            <label className="mb-0 text-nowrap mr-2 small font-weight-bold">Espécie:</label>
            <select
              className="form-control"
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="Todos">Todas as Espécies</option>
              <option value="Cachorro">Cachorros</option>
              <option value="Gato">Gatos</option>
              <option value="Outro">Outros</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="p-3 bg-white border rounded shadow-sm text-center">
            <h5 className="text-primary mb-0 font-weight-bold">{pets.length}</h5>
            <small className="text-muted">Total de Pets</small>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="p-3 bg-white border rounded shadow-sm text-center">
            <h5 className="text-success mb-0 font-weight-bold">
              {pets.filter((p) => (p.tipo || "Cachorro") === "Cachorro").length}
            </h5>
            <small className="text-muted">Cachorros</small>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="p-3 bg-white border rounded shadow-sm text-center">
            <h5 className="text-warning mb-0 font-weight-bold">
              {pets.filter((p) => p.tipo === "Gato").length}
            </h5>
            <small className="text-muted">Gatos</small>
          </div>
        </div>
      </div>

      <ReusableTable
        headers={["Nome", "Espécie", "Raça", "Idade / Porte", "Descrição"]}
        data={filteredPets.map((p) => ({
          ...p,
          tipo: p.tipo || "Cachorro",
          raca: p.raca || "Mestiço / SRD"
        }))}
        keys={["nome", "tipo", "raca", "idade", "desc"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
