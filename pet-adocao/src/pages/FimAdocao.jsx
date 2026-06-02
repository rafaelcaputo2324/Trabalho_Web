import "../src_styles/fim.css";

function FimAdocao() {
  return (
    <>
      <header>
        <h1>Pedido de Adoção Confirmado</h1>
      </header>
      <br />

      <img src="/img/fim.jpg" alt="Adoção confirmada" />

      <section className="conteudo">
        <h2>Seu pedido de adoção foi realizado com sucesso!</h2>
        <p>
          Ficamos felizes que você tenha decidido adotar um pet. Nossa equipe entrará em contato com você em breve para os próximos passos.
        </p>
        <p>
          Enquanto isso, se tiver dúvidas ou precisar de mais informações, não hesite em nos contatar.
        </p>
      </section>
    </>
  );
}

export default FimAdocao;
