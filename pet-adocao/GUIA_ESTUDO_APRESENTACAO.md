# Anotações de Estudo para a Apresentação do Projeto
**Projeto:** Cafofo dos Peludos  
**Módulos sob minha responsabilidade:**
- Módulo 1: Os 3 CRUDs
- Módulo 2: Autenticação de Usuários
- Módulo 4: Consumo de APIs

---

## 1. Visão Geral dos Módulos

### Módulo 1: Os 3 CRUDs do Sistema
- **CRUD 1 — Animais (Pets):**
  - **Create:** Tela `AddPet.jsx` (adiciona nome, espécie, raça, porte, foto e descrição).
  - **Read:** Vitrine pública com fotos em `QueroAdotar.jsx` e tabela administrativa em `GerenciarPets.jsx`.
  - **Update:** Edição de pets em `AddPet.jsx?id=...`.
  - **Delete:** Botão de excluir em `QueroAdotar.jsx` e `GerenciarPets.jsx`.
- **CRUD 2 — Voluntários / Contatos:**
  - **Create:** Formulário em `FormularioVoluntario.jsx` e cadastro no painel `GerenciarVoluntarios.jsx`.
  - **Read:** Tabela de voluntários com busca em tempo real em `GerenciarVoluntarios.jsx`.
  - **Update:** Edição de dados no próprio formulário de `GerenciarVoluntarios.jsx`.
  - **Delete:** Exclusão com confirmação.
- **CRUD 3 — Adoções:**
  - **Create:** Formulário de adoção em 2 etapas (`FormAdocao1.jsx` e `FormAdocao2.jsx`) ou cadastro direto em `GerenciarAdocoes.jsx`.
  - **Read:** Listagem de pedidos em `GerenciarAdocoes.jsx` e relatório consolidado unindo pet e adotante em `Relatorio.jsx`.
  - **Update:** Alteração do status (Pendente, Aprovada, Entregue, Cancelada).
  - **Delete:** Exclusão da solicitação.

---

### Módulo 2: Autenticação com Firebase Authentication
- **Onde fica o código:** `src/services/firebase.js` e `src/context/AuthContext.jsx`.
- **Como funciona:**
  - Usamos a biblioteca oficial do Firebase (`firebase/auth`).
  - `createUserWithEmailAndPassword(auth, email, senha)` para cadastrar novos usuários.
  - `signInWithEmailAndPassword(auth, email, senha)` para realizar login.
  - `signOut(auth)` para desconectar.
  - `onAuthStateChanged(auth, ...)` para manter o usuário logado mesmo dando recarregar na página.
  - `ProtectedRoute.jsx` bloqueia rotas como `/gerenciar-pets`, `/gerenciar-voluntarios`, `/gerenciar-adocoes` e `/adicionar-pet` caso a pessoa não esteja logada, redirecionando para `/login`.

---

### Módulo 4: Consumo de APIs
- **Onde fica o código:** `src/services/api.js`.
- **API 1 — ViaCEP (`https://viacep.com.br/ws/{cep}/json/`):**
  - **Objetivo:** Preencher endereço de forma automática ao digitar o CEP nos formulários de voluntário e adoção.
  - **Dados enviados:** Número do CEP digitado (8 dígitos).
  - **Dados recebidos:** JSON com rua (`logradouro`), bairro, cidade (`localidade`) e estado (`uf`).
  - **Onde foi usada:** `FormularioVoluntario.jsx`, `FormAdocao1.jsx` e `GerenciarVoluntarios.jsx`.
- **API 2 — Dog CEO API (`https://dog.ceo/api/breeds/...`):**
  - **Objetivo:** Trazer lista oficial de raças caninas e fotos para auxiliar no cadastro do pet e na página de catálogo de raças.
  - **Dados enviados:** Nome da raça.
  - **Dados recebidos:** Lista de raças e link de foto da raça.
  - **Onde foi usada:** Tela de cadastro `AddPet.jsx` (botão de sugerir foto) e na tela `GuiaRacas.jsx`.

---

## 2. Perguntas que o Professor Pode Fazer (Avaliação Individual)

### Pergunta: "Quais são os 3 CRUDs do seu projeto e onde estão as 4 operações de cada um?"
**Como responder:**
> "No nosso sistema temos três CRUDs interligados:
> 1. O CRUD de Pets, onde cadastramos os animais em `AddPet`, listamos na vitrine `QueroAdotar` e na tabela `GerenciarPets`, editamos pelo formulário de edição e excluímos tanto na vitrine quanto na tabela.
> 2. O CRUD de Voluntários, onde pessoas se inscrevem em `FormularioVoluntario` e o administrador visualiza, edita e remove em `GerenciarVoluntarios`.
> 3. O CRUD de Adoções, onde a solicitação é criada no fluxo de adoção ou no painel `GerenciarAdocoes`, consultada na lista e no relatório consolidado, com atualização de status (Pendente/Aprovada) e exclusão."

### Pergunta: "Como vocês implementaram a autenticação de usuários?"
**Como responder:**
> "Usamos o Firebase Authentication. Configuramos a inicialização do Firebase em `services/firebase.js` e gerenciamos o estado global com Context API em `AuthContext.jsx`. Usamos `signInWithEmailAndPassword` para entrar e `createUserWithEmailAndPassword` para novos cadastros. O listener `onAuthStateChanged` monitora a sessão para que o login não se perca ao atualizar a página. Criamos também o componente `ProtectedRoute`, que verifica se o usuário está logado antes de liberar o acesso às telas administrativas."

### Pergunta: "Qual API externa vocês consumiram e qual o papel dela no sistema?"
**Como responder:**
> "Consumimos a API do ViaCEP e a Dog CEO API. A ViaCEP resolve um problema real de usabilidade: quando o voluntário ou adotante digita o CEP, o sistema faz uma requisição assíncrona com `fetch` e preenche rua, bairro, cidade e estado automaticamente, evitando erros manuais. A Dog CEO API alimenta nosso catálogo de raças e permite carregar fotos de exemplo no cadastro do pet."

### Pergunta: "Por que usamos funções assíncronas (`async/await`) no consumo de APIs?"
**Como responder:**
> "Porque requisições de rede levam tempo para responder. O `async/await` permite aguardar a resposta da API sem travar a interface do usuário nem bloquear a execução do código no navegador."

---

## 3. Roteiro Rápido para a Apresentação

1. Iniciar o projeto com `npm run dev` e abrir `http://localhost:5173`.
2. Mostrar a tela **Guia de Raças** no menu (mostrando a Dog CEO API funcionando e trocando de foto).
3. Abrir a tela **Seja Voluntário**, digitar um CEP (ex: `70040-010`) e mostrar o preenchimento automático do ViaCEP.
4. Tentar entrar em *Painel Administrativo -> Gerenciar Pets* deslogado (mostrar que o `ProtectedRoute` barra e manda para a tela de login).
5. Na tela de login, criar uma conta nova na aba **Cadastrar** e fazer login.
6. Mostrar que o menu administrativo agora está liberado.
7. Mostrar o CRUD de Pets em **Gerenciar Pets** (cadastrar, filtrar por espécie, editar e excluir).
8. Mostrar o CRUD de Adoções e o **Relatório Consolidado** unindo Pet e Adotante.
