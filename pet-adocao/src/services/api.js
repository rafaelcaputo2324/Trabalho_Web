export async function fetchAddressByCep(cep) {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("O CEP deve conter 8 dígitos.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  if (!response.ok) {
    throw new Error("Não foi possível consultar o CEP.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: data.cep,
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    uf: data.uf
  };
}

export async function fetchDogBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) throw new Error("Erro na busca de raças.");
    const data = await response.json();
    return Object.keys(data.message || {});
  } catch (error) {
    return [
      "beagle",
      "boxer",
      "bulldog",
      "chihuahua",
      "dachshund",
      "golden",
      "labrador",
      "poodle",
      "pug",
      "rottweiler",
      "husky",
      "pitbull"
    ];
  }
}

export async function fetchDogBreedImage(breed) {
  try {
    const formattedBreed = breed.toLowerCase().trim();
    const response = await fetch(`https://dog.ceo/api/breed/${formattedBreed}/images/random`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.message;
  } catch (error) {
    return null;
  }
}

export async function fetchPetFact() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) return null;
    const data = await response.json();
    return data.fact;
  } catch (error) {
    return "Os animais resgatados criam laços de amor e gratidão com suas novas famílias.";
  }
}
