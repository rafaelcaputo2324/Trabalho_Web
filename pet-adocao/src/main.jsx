import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { iniciarBanco } from './services/sqlite'
import { iniciarSincronizacao } from './services/syncService'

const root = createRoot(document.getElementById('root'))

iniciarBanco()
  .then(() => {
    iniciarSincronizacao()
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
  })
  .catch((err) => {
    console.error(err)
    root.render(
      <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
        <h2>Não foi possível abrir o banco de dados local (SQLite).</h2>
        <p>{String(err.message || err)}</p>
      </div>,
    )
  })
