# Cafofo dos Peludos — Adoção de Pets

App React com Firebase Authentication, Firestore (nuvem), SQLite (local) e sincronização entre os dois.

## Como rodar (em qualquer computador)

Pré-requisito: **Node.js** instalado (versão LTS, em https://nodejs.org) e internet para baixar as dependências.

```
git clone https://github.com/rafaelcaputo2324/Trabalho_Web.git
cd Trabalho_Web
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

> O `npm install` na pasta principal já instala também as dependências da pasta `pet-adocao`.
> A configuração do Firebase já está no código — não precisa criar `.env`.

## Onde fica cada parte

| Parte | Arquivo |
|---|---|
| Banco local SQLite (tabelas, gravação no navegador) | `pet-adocao/src/services/sqlite.js` |
| CRUD usado pelas telas (listar, inserir, atualizar, excluir) | `pet-adocao/src/services/repositorio.js` |
| Sincronização SQLite ⇄ Firestore (fila de pendentes, detecção de internet) | `pet-adocao/src/services/syncService.js` |
| Chamadas ao Firestore (setDoc, deleteDoc, getDocs) | `pet-adocao/src/services/firestoreSync.js` |
| Configuração do Firebase (Auth + Firestore) | `pet-adocao/src/services/firebase.js` |
| Tela que mostra o conteúdo do SQLite | `pet-adocao/src/pages/BancoLocal.jsx` |

## Roteiro para demonstrar o banco local e a sincronização

1. Faça login (ou cadastre um usuário na tela de login).
2. Abra **Painel Administrativo → Banco Local (SQLite)** (ou o botão **Ver SQLite** na barra de status) para mostrar as tabelas `pets`, `voluntarios` e `adocoes` com a coluna `sync_status`.
3. Aperte **F12 → aba Network (Rede)** e troque "No throttling" por **Offline**. A barra de status fica vermelha.
4. Cadastre ou edite um voluntário/pet/adoção. O registro aparece no SQLite como **PENDENTE** e o contador de pendentes aumenta.
5. Volte o Network para **No throttling**. O app detecta a internet, envia os pendentes ao Firestore e eles viram **SINCRONIZADO**.
6. Mostre no console do Firebase (Firestore Database → Dados) que o registro chegou.

Extra: o botão **Baixar arquivo .sqlite** gera o arquivo do banco, que pode ser aberto no programa *DB Browser for SQLite*.
