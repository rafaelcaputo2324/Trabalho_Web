import { Link } from "react-router-dom";
import "../src_styles/css.css";
import "../src_styles/BN.css";

function Home() {
  return (
    <>
      {/* Carrossel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/img/1.png" alt="Primeiro Slide" style={{ height: "650px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/img/2.png" alt="Segundo Slide" style={{ height: "650px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/img/3.png" alt="Terceiro Slide" style={{ height: "650px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/img/Banner promoção pet shop divertido amarelo.png" alt="Quarto Slide" style={{ height: "650px", objectFit: "cover" }} />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Anterior</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Próximo</span>
        </a>
      </div>

      <br /><br /><br />

      <div className="t1">
        <h3 style={{ color: "orange" }}>Conheça o Cafofo peludo</h3>
        <p>
          A ONG de adoção de animais tem como principal objetivo resgatar, cuidar e promover a adoção responsável de animais abandonados ou em situação de risco. Seu trabalho envolve a recuperação de animais em condições precarias, como aqueles vítimas de maus-tratos ou que vivem nas ruas, oferecendo tratamento veterinário, alimentação, abrigo e amor. Além disso, a ONG realiza campanhas de conscientização sobre a importância da adoção responsável, evitando o abandono e incentivando a esterilização. Por meio de parcerias com voluntários, empresas e outras organizações, a ONG facilita a conexão entre animais e novas familias, garantindo um lar seguro e amoroso para os pets.
        </p>
      </div>

      <br /><br /><br /><br />

      {/* Cards informativos */}
      <div className="card-group">
        <div className="card2">
          <img className="card-img-to" src="/img/adotar1.png" alt="Ache seu novo amiguinho" />
          <div className="card-body">
            <h5 className="card-title">Ache seu novo amiguinho</h5>
            <p className="card-tex">
              Adotar um animalzinho é um gesto de carinho e responsabilidade. Antes de decidir, avalie se você tem condições de cuidar dele. Procure abrigos ou ONGs e visite os animais disponíveis. Escolha com atenção, considerando o temperamento e as necessidades do pet. Após a adoção, ofereça cuidados, carinho e um ambiente seguro.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Confira a lista de animais <Link to="/quero-adotar">aqui</Link>.</small>
          </div>
        </div>

        <div className="card2">
          <img className="card-img-to" src="/img/adocao.png" alt="Formulário de interesse" />
          <div className="card-body">
            <h5 className="card-title">Formulario de interesse</h5>
            <p className="card-tex">
              Se você está pensando em adotar um pet, o primeiro passo é preencher o formulário de adoção. Esse formulário ajuda os abrigos a entender melhor seu perfil e garantir que você está pronto para assumir a responsabilidade de cuidar de um animal. Ao preenchê-lo, seja honesto sobre sua rotina, espaço disponível e expectativas, para que o abrigo possa orientar a melhor escolha de pet para você.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Confira o nosso formulario <Link to="/termo-adocao">aqui</Link>.</small>
          </div>
        </div>

        <div className="card2">
          <img className="card-img-to" src="/img/formularioa2.png" alt="Adoção finalizada" />
          <div className="card-body">
            <h5 className="card-title">Adoção finalizada</h5>
            <p className="card-tex">
              A adoção do seu novo amigo está completa e agora vocês começam uma jornada de muitos momentos especiais juntos. Agradecemos por escolher adotar e por oferecer um lar cheio de amor e cuidado. Seu gesto faz toda a diferença na vida do animal e contribui para um futuro mais seguro e feliz para ele. Desejamos muitas alegrias e um vínculo duradouro com seu novo companheiro!
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Parabéns!!!!!</small>
          </div>
        </div>
      </div>

      <br /><br />

      <p className="p2">
        Algumas ONGs e protetores parceiros podem solicitar a cobrança de uma taxa no momento da adoção, com a finalidade de auxílio de custos. Esta cobrança / recebimento é realizada diretamente entre o adotante e ONG/protetor parceiro.
      </p>
      <br /><br />

      <div className="alert alert-primary" role="alert">
        <h1 className="h1video">Por que adotar?</h1>
      </div>

      <div className="pqadotar">
        <ol>
          <li>Salva vidas: Ao adotar, você dá uma nova chance de vida a um animal que precisa de um lar.</li>
          <li>Combate ao abandono: Adoção reduz a quantidade de animais abandonados nas ruas e em abrigos.</li>
          <li>Companheirismo e amor: Animais adotados geralmente são muito gratos e oferecem amor incondicional.</li>
          <li>Custo mais baixo: Adoção geralmente envolve custos menores em comparação à compra de um pet de criador.</li>
          <li>Ajuda a controlar a superpopulação: Adotar, em vez de comprar, contribui para controlar a população de animais.</li>
          <li>Adoção consciente: Ao adotar, você ajuda animais que precisam de um lar e evita a compra de animais de criadores irresponsáveis.</li>
          <li>Benefícios emocionais: Ter um pet pode diminuir o estresse, ansiedade e aumentar a felicidade.</li>
        </ol>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4FlvZPHrFlc?si=iDHIaN7p9NS2ScVm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default Home;
