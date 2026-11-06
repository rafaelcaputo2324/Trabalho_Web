import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../src_styles/form2.css";

export default function FormAdocao2() {
  const [motivo, setMotivo] = useState("");
  const [tempData, setTempData] = useState(null);
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("cafofo_adocao_temp");
    if (raw) {
      const parsed = JSON.parse(raw);
      setTempData(parsed);

      const savedPets = localStorage.getItem("cafofo_pets");
      if (savedPets) {
        const petsList = JSON.parse(savedPets);
        const found = petsList.find((p) => p.id === parsed.petId);
        if (found) setPet(found);
      }
    } else {
      // Se não preencheu a etapa 1, redireciona
      navigate("/formulario-adocao-1");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo.trim()) {
      setError("Por favor, conte um pouco sobre sua motivação para adotar.");
      return;
    }

    if (!tempData) return;

    // 1. Cadastra ou localiza o adotante na lista de voluntários/contatos (CRUD 2)
    const rawVolunteers = localStorage.getItem("cafofo_volunteers");
    const volunteersList = rawVolunteers ? JSON.parse(rawVolunteers) : [];
    let adopter = volunteersList.find((v) => v.email === tempData.email);

    if (!adopter) {
      adopter = {
        id: Date.now().toString(),
        nome: tempData.nome,
        email: tempData.email,
        telefone: tempData.telefone,
        endereco: tempData.endereco,
        idade: "25",
        tempo: "Adotante",
        genero: "Outro"
      };
      volunteersList.push(adopter);
      localStorage.setItem("cafofo_volunteers", JSON.stringify(volunteersList));
    }

    // 2. Registra o pedido no CRUD de Adoções (CRUD 3)
    const rawAdoptions = localStorage.getItem("cafofo_adoptions");
    const adoptionsList = rawAdoptions ? JSON.parse(rawAdoptions) : [];

    const newAdoption = {
      id: Date.now().toString(),
      petId: tempData.petId,
      volunteerId: adopter.id,
      data: new Date().toISOString().split("T")[0],
      status: "Pendente",
      motivo: motivo.trim()
    };

    adoptionsList.push(newAdoption);
    localStorage.setItem("cafofo_adoptions", JSON.stringify(adoptionsList));

    // Limpa dados temporários
    localStorage.removeItem("cafofo_adocao_temp");

    navigate("/confirmacao-adocao");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "750px" }}>
      <div className="card shadow-sm border-0 p-4 bg-white rounded">
        <h2 className="text-center mb-3" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
          Etapa Final: Motivo da Adoção
        </h2>

        {tempData && (
          <div className="alert alert-secondary py-2 small mb-3">
            <strong>Adotante:</strong> {tempData.nome} ({tempData.email})<br />
            <strong>Pet Escolhido:</strong> {pet ? `${pet.nome} (${pet.tipo || "Pet"})` : "Pet Selecionado"}
          </div>
        )}

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="text mb-4">
            <label className="font-weight-bold mb-2">
              Explique por que você deseja adotar um animal e como é o espaço em sua residência:
            </label>
            <textarea
              id="motivo-adocao"
              name="motivo-adocao"
              placeholder="Conte-nos sobre sua rotina, se possui outros animais em casa e o que te motivou a escolher este pet..."
              rows="6"
              className="form-control"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/formulario-adocao-1" className="btn btn-outline-secondary">
              ← Voltar à Etapa 1
            </Link>
            <button
              type="submit"
              className="btn text-white px-5 shadow-sm font-weight-bold"
              style={{ backgroundColor: "rgb(235, 167, 104)", borderRadius: "20px" }}
            >
              Concluir e Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
