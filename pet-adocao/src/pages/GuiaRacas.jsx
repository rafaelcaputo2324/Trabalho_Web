import { useState, useEffect } from "react";
import { fetchDogBreeds, fetchDogBreedImage, fetchPetFact } from "../services/api";

export default function GuiaRacas() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedImage, setBreedImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [petFact, setPetFact] = useState("");
  const [loadingFact, setLoadingFact] = useState(false);

  useEffect(() => {
    const loadBreeds = async () => {
      const list = await fetchDogBreeds();
      setBreeds(list);
      if (list.length > 0) {
        setSelectedBreed(list[0]);
        loadImage(list[0]);
      }
    };

    loadBreeds();
    loadNewFact();
  }, []);

  const loadImage = async (breed) => {
    setLoadingImage(true);
    const imgUrl = await fetchDogBreedImage(breed);
    setBreedImage(imgUrl);
    setLoadingImage(false);
  };

  const handleBreedChange = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
    loadImage(breed);
  };

  const loadNewFact = async () => {
    setLoadingFact(true);
    const fact = await fetchPetFact();
    setPetFact(fact);
    setLoadingFact(false);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
          Guia de Raças & Curiosidades
        </h1>
        <p className="text-muted">
          Conheça as características visuais e curiosidades sobre os animais antes de adotar.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm border-0 h-100 p-4" style={{ borderRadius: "15px" }}>
            <h4 className="text-primary mb-3">🐶 Catálogo de Raças</h4>
            <p className="small text-muted">
              Selecione uma raça para carregar fotografias de exemplo da raça em tempo real.
            </p>

            <div className="form-group mb-3">
              <label className="font-weight-bold">Raça Canina:</label>
              <select
                className="form-control"
                value={selectedBreed}
                onChange={handleBreedChange}
              >
                {breeds.map((b) => (
                  <option key={b} value={b}>
                    {b.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center mt-3 p-3 bg-light rounded" style={{ minHeight: "320px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {loadingImage ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Carregando imagem...</span>
                </div>
              ) : breedImage ? (
                <div>
                  <img
                    src={breedImage}
                    alt={selectedBreed}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                  <div className="mt-2 text-capitalize font-weight-bold text-secondary">
                    Exemplar da raça: {selectedBreed}
                  </div>
                </div>
              ) : (
                <p className="text-muted">Nenhuma foto disponível no momento.</p>
              )}
            </div>

            <div className="mt-3 text-center">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => loadImage(selectedBreed)}
                disabled={loadingImage}
              >
                🔄 Ver outra foto
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-5 mb-4">
          <div className="card shadow-sm border-0 h-100 p-4 bg-light" style={{ borderRadius: "15px" }}>
            <h4 className="text-success mb-3">🐱 Curiosidade do Dia</h4>
            <p className="small text-muted">
              Fatos interessantes sobre o mundo animal:
            </p>

            <div className="p-3 bg-white rounded shadow-sm mb-4" style={{ minHeight: "150px" }}>
              {loadingFact ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-success" role="status"></div>
                  <span className="ml-2 small text-muted">Carregando curiosidade...</span>
                </div>
              ) : (
                <blockquote className="blockquote mb-0">
                  <p className="small text-dark font-italic">"{petFact}"</p>
                  <footer className="blockquote-footer">Curiosidade animal</footer>
                </blockquote>
              )}
            </div>

            <button
              className="btn btn-outline-success btn-sm w-100 mb-4"
              onClick={loadNewFact}
              disabled={loadingFact}
            >
              ✨ Ver outra curiosidade
            </button>

            <div className="border-top pt-3">
              <h6 className="font-weight-bold text-secondary">Dica de Adoção Responsável</h6>
              <p className="small text-muted mb-0">
                Lembre-se: animais sem raça definida (vira-latas) são extremamente carinhosos, resistentes e inteligentes. Todo animal merece carinho, vacinas em dia e um lar seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
