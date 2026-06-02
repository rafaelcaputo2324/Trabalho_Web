import "../src_styles/faq.css";

function FAQ() {
  return (
    <>
      <header>
        <h1>FAQ - Como Ajudar?</h1>
      </header>

      <section className="faq">
        <h2>Perguntas Frequentes</h2>

        <div className="faq-item">
          <h3>Como posso ajudar a ONG?</h3>
          <p>Você pode ajudar de diversas formas, como fazendo doações, adotando um animal, sendo voluntário ou ajudando a divulgar nosso trabalho.</p>
        </div>

        <div className="faq-item">
          <h3>Quais são os requisitos para adotar um animal?</h3>
          <p>Para adotar, você precisa ser maior de 18 anos, ter uma residência adequada e estar disposto a cuidar do animal com responsabilidade.</p>
        </div>

        <div className="faq-item">
          <h3>Onde posso fazer uma doação?</h3>
          <p>Você pode fazer doações financeiras pelo nosso site ou doações de ração e produtos diretamente na nossa sede.</p>
        </div>

        <div className="faq-item">
          <h3>Posso ser voluntário? Como me inscrevo?</h3>
          <p>Sim! Basta preencher o formulário de inscrição no nosso site e aguardar a nossa confirmação.</p>
        </div>
      </section>

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default FAQ;
