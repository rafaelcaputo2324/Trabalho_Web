import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchDogBreeds, fetchDogBreedImage } from "../services/api";
import { buscarPorId, inserir, atualizar } from "../services/repositorio";
import "../src_styles/pet.css";

export default function AddPet() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Cachorro");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [breedsList, setBreedsList] = useState([]);
  const [loadingApiImg, setLoadingApiImg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const petId = searchParams.get("id");

  useEffect(() => {
    fetchDogBreeds().then((list) => {
      setBreedsList(list);
      if (list.length > 0 && !raca) {
        setRaca(list[0]);
      }
    });

    if (petId) {
      const petToEdit = buscarPorId("pets", petId);
      if (petToEdit) {
        setNome(petToEdit.nome);
        setIdade(petToEdit.idade);
        setDesc(petToEdit.desc);
        setImg(petToEdit.img || "");
        if (petToEdit.tipo) setTipo(petToEdit.tipo);
        if (petToEdit.raca) setRaca(petToEdit.raca);
      }
    }
  }, [petId]);

  const handleFetchBreedPhoto = async () => {
    if (!raca) return;
    setLoadingApiImg(true);
    const photoUrl = await fetchDogBreedImage(raca);
    if (photoUrl) {
      setImg(photoUrl);
    }
    setLoadingApiImg(false);
  };

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
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (petId) {
      const petAtual = buscarPorId("pets", petId);
      atualizar("pets", petId, { nome, tipo, raca, idade, desc, img: img || petAtual?.img });
      setSuccess("Pet atualizado com sucesso!");
    } else {
      inserir("pets", {
        nome,
        tipo,
        raca: raca || "Mestiço / SRD",
        idade,
        desc,
        img: img || "/img/logo1.png",
      });
      setSuccess(navigator.onLine ? "Pet cadastrado com sucesso!" : "Sem internet: pet salvo no aparelho e será enviado quando a conexão voltar.");
    }

    setTimeout(() => {
      navigate("/quero-adotar");
    }, 1200);
  };

  return (
    <>
      <header>
        <h1>{petId ? "Editar Pet" : "Adicionar Pet para Adoção"}</h1>
      </header>

      <section className="form-container mb-5">
        <h2>
          {petId
            ? "Atualize as informações do pet selecionado."
            : "Preencha o formulário abaixo para registrar um animal resgatado no Cafofo."}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="pet-form">
          <label htmlFor="nome">Nome do Pet: *</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome carinhoso do pet"
            required
          />

          <label htmlFor="tipo">Espécie: *</label>
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

          {tipo === "Cachorro" && (
            <div className="p-3 my-2 bg-light rounded border">
              <label htmlFor="racaSelect" className="font-weight-bold text-secondary mb-1">
                Raça Canina:
              </label>
              <div className="d-flex gap-2">
                <select
                  id="racaSelect"
                  className="form-control"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                >
                  <option value="srd">Sem Raça Definida (Vira-lata)</option>
                  {breedsList.map((b) => (
                    <option key={b} value={b}>
                      {b.toUpperCase()}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-outline-info ml-2 btn-sm text-nowrap"
                  onClick={handleFetchBreedPhoto}
                  disabled={loadingApiImg}
                >
                  {loadingApiImg ? "Buscando..." : "⚡ Sugerir Foto"}
                </button>
              </div>
            </div>
          )}

          <label htmlFor="idade">Idade / Porte: *</label>
          <input
            type="text"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Ex: 8 meses, 2 anos, Filhote..."
            required
          />

          <label htmlFor="descricao">História e Temperamento: *</label>
          <textarea
            id="descricao"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descreva o comportamento do animal (sociável, brincalhão, calmo...)"
            rows="4"
            required
          ></textarea>

          <div className="form-group my-3">
            <label htmlFor="fotoPet" className="font-weight-bold">
              Foto do Pet (Upload ou Link direto):
            </label>
            <input
              type="file"
              className="form-control-file mb-2"
              id="fotoPet"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="url"
              className="form-control"
              placeholder="Ou cole aqui a URL direta da imagem"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            {img && (
              <div className="mt-2 text-center p-2 bg-light border rounded">
                <p className="small text-muted mb-1">Pré-visualização da imagem:</p>
                <img
                  src={img}
                  alt="Preview"
                  style={{ maxHeight: "160px", maxWidth: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 py-2">
            {petId ? "Salvar Alterações" : "Cadastrar Pet"}
          </button>
        </form>
      </section>

      <footer>
        <p>
          Cafofo dos Peludos - Gestão de Adoção e Resgates
        </p>
      </footer>
    </>
  );
}
