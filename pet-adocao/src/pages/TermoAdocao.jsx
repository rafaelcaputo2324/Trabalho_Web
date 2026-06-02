import { Link } from "react-router-dom";
import "../src_styles/pag1.css";

function TermoAdocao() {
  return (
    <>
      <div className="interesse">
        <h2>Interessado em Adotar um Peludo?</h2>

        <p>
          Que alegria receber o seu interesse em adotar um dos nossos adoráveis peludinhos! Cada um deles espera ansiosamente por um novo lar, e ficamos muito felizes em saber que você está disposto a proporcionar um futuro melhor para um animalzinho carente.
        </p>
        <p>
          A adoção de um pet é um ato de amor e responsabilidade. Ao adotar, você não só ganha um novo amigo, mas também assume o compromisso de cuidar dele por toda a vida — oferecendo alimentação, atenção, carinho e, principalmente, saúde. E é por isso que queremos garantir que você esteja bem preparado para essa nova jornada, e que o peludo escolhido vá para um lar cheio de amor e cuidado.
        </p>
        <p>
          Para que possamos conhecer melhor suas intenções e garantir que a adoção seja uma escolha consciente e responsável, por favor, preencha as informações abaixo. Isso nos ajudará a entender as suas condições e expectativas, além de tornar o processo mais transparente e seguro tanto para você quanto para o nosso peludinho.
        </p>
        <p>
          Após o envio do formulário, nossa equipe entrará em contato para esclarecer dúvidas, dar mais detalhes sobre o processo de adoção e agendar a visita ao animalzinho de sua escolha, caso ele esteja disponível. Vamos dar esse passo juntos e fazer a diferença na vida de um peludo!
        </p>

        {/* Botão para acionar modal */}
        <button type="button" className="but" data-toggle="modal" data-target="#ModalLongoExemplo">
          Concluído
        </button>

        {/* Modal */}
        <div className="modal fade" id="ModalLongoExemplo" tabIndex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="TituloModalLongoExemplo">
                  Termo de Declaração para Adoção de Animais
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Declaro ter responsabilidade pela Adoção, Você assume total responsabilidade pelo bem-estar do animal, garantindo um lar adequado e cuidando de sua saúde, alimentação e necessidades.
                </p>
                <p>
                  Cuidados Veterinários: Você se compromete a fornecer ao animal atendimento veterinário regular, incluindo vacinas, vermifugação, castração e qualquer outro cuidado necessário para sua saúde e segurança.
                </p>
                <p>
                  Compromisso a Longo Prazo: A adoção de um animal envolve um compromisso de longo prazo, e você se compromete a manter o animal durante toda sua vida, salvo em casos de extrema impossibilidade, onde se compromete a devolvê-lo à instituição responsável.
                </p>
                <p>
                  Condições de Adoção: Você está ciente de que pode ser necessário cumprir requisitos adicionais para a adoção, como visita domiciliar ou assinatura de termos de compromisso, conforme determinado pela nossa instituição.
                </p>
                <p>
                  Devolução e Recolocação: Caso, em algum momento, você não possa mais cuidar do animal, você se compromete a devolvê-lo à instituição de adoção para que outra pessoa possa dar-lhe um novo lar.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="button" data-dismiss="modal">Fechar</button>
                <Link to="/formulario-adocao-1" className="but" data-dismiss="modal">Confirmar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default TermoAdocao;
