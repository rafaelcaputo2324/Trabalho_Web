import "../src_styles/faq.css";

export default function FAQ() {
  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <header className="text-center mb-5">
        <h1 style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>FAQ - Como Ajudar?</h1>
      </header>

      <section className="faq bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4 text-center" style={{ color: "orange" }}>Perguntas Frequentes</h2>

        <div className="faq-item mb-4 pb-3 border-bottom">
          <h3 className="h5 text-primary">Como posso ajudar a ONG?</h3>
          <p className="text-muted">Você pode ajudar de diversas formas, como fazendo doações, adotando um animal, sendo voluntário ou ajudando a divulgar nosso trabalho.</p>
        </div>

        <div className="faq-item mb-4 pb-3 border-bottom">
          <h3 className="h5 text-primary">Quais são os requisitos para adotar um animal?</h3>
          <p className="text-muted">Para adotar, você precisa ser maior de 18 anos, ter uma residência adequada e estar disposto a cuidar do animal com responsabilidade.</p>
        </div>

        <div className="faq-item mb-4 pb-3 border-bottom">
          <h3 className="h5 text-primary">Onde posso fazer uma doação?</h3>
          <p className="text-muted">Você pode fazer doações financeiras pelo nosso site ou doações de ração e produtos diretamente na nossa sede.</p>
        </div>

        <div className="faq-item mb-3">
          <h3 className="h5 text-primary">Posso ser voluntário? Como me inscrevo?</h3>
          <p className="text-muted">Sim! Basta preencher o formulário de inscrição no nosso site e aguardar a nossa confirmação.</p>
        </div>
      </section>

      <footer className="text-center mt-5 text-muted">
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com" className="text-primary font-weight-bold">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </div>
  );
}
