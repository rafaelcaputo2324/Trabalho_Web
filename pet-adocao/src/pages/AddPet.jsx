import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../src_styles/pet.css";

export default function AddPet() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Cachorro");
  const [idade, setIdade] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const petId = searchParams.get("id");

  useEffect(() => {
    if (petId) {
      const savedPets = localStorage.getItem("cafofo_pets");
      if (savedPets) {
        const petsList = JSON.parse(savedPets);
        const petToEdit = petsList.find((p) => p.id === petId);
        if (petToEdit) {
          setNome(petToEdit.nome);
          setIdade(petToEdit.idade);
          setDesc(petToEdit.desc);
          setImg(petToEdit.img || "");
          if (petToEdit.tipo) {
            setTipo(petToEdit.tipo);
          }
        }
      }
    }
  }, [petId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nome || !idade || !desc) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const savedPets = localStorage.getItem("cafofo_pets");
    const petsList = savedPets ? JSON.parse(savedPets) : [];

    if (petId) {
      const updatedPets = petsList.map((p) => {
        if (p.id === petId) {
          return { ...p, nome, tipo, idade, desc, img: img || p.img };
        }
        return p;
      });
      localStorage.setItem("cafofo_pets", JSON.stringify(updatedPets));
      setSuccess("Pet atualizado com sucesso!");
    } else {
      const newPet = {
        id: Date.now().toString(),
        nome,
        tipo,
        idade,
        desc,
        img: img || "/img/logo1.png",
      };
      petsList.push(newPet);
      localStorage.setItem("cafofo_pets", JSON.stringify(petsList));
      setSuccess("Pet adicionado com sucesso!");
    }

    setTimeout(() => {
      navigate("/quero-adotar");
    }, 1500);
  };

  return (
    <>
      <header>
        <h1>{petId ? "Editar Pet" : "Adicione um Pet para Adoção"}</h1>
      </header>

      <section className="form-container mb-5">
        <h2>
          {petId
            ? "Atualize os detalhes do pet selecionado."
            : "Preencha os detalhes abaixo para adicionar um pet à nossa lista de adoção."}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="pet-form">
          <label htmlFor="nome">Nome do Pet:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do pet"
            required
          />

          <label htmlFor="tipo">Tipo de Animal:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="idade">Idade do Pet:</label>
          <input
            type="text"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade do pet"
            required
          />

          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descreva as características do pet"
            rows="4"
            required
          ></textarea>

          <div className="form-group my-3">
            <label htmlFor="fotoPet">Foto do Pet</label>
            <input
              type="file"
              className="form-control-file"
              id="fotoPet"
              accept="image/*"
              onChange={handleImageChange}
            />
            {img && (
              <div className="mt-2">
                <img src={img} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
              </div>
            )}
          </div>

          <button type="submit">{petId ? "Salvar Alterações" : "Adicionar Pet"}</button>
        </form>
      </section>

      <footer>
        <p>
          Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a>
        </p>
      </footer>
    </>
  );
}
