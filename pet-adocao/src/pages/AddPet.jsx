import "../src_styles/pet.css";

function AddPet() {
  return (
    <>
      <header>
        <h1>Adicione um Pet para Adoção</h1>
      </header>

      <section className="form-container">
        <h2>Preencha os detalhes abaixo para adicionar um pet à nossa lista de adoção.</h2>

        <form className="pet-form">
          <label htmlFor="nome">Nome do Pet:</label>
          <input type="text" id="nome" name="nome" placeholder="Nome do pet" required />

          <label htmlFor="tipo">Tipo de Animal:</label>
          <select id="tipo" name="tipo" required>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="idade">Idade do Pet:</label>
          <input type="text" id="idade" name="idade" placeholder="Idade do pet" required />

          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" placeholder="Descreva as características do pet" rows="4" required></textarea>

          <div className="form-group">
            <label htmlFor="fotoPet">Adicionar foto de pet</label>
            <input type="file" className="form-control-file" id="fotoPet" />
          </div>

          <button type="submit">Adicionar Pet</button>
        </form>
      </section>

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default AddPet;
