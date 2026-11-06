import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import QueroAdotar from "./pages/QueroAdotar";
import TermoAdocao from "./pages/TermoAdocao";
import FormAdocao1 from "./pages/FormAdocao1";
import FormAdocao2 from "./pages/FormAdocao2";
import FimAdocao from "./pages/FimAdocao";
import AddPet from "./pages/AddPet";
import GerenciarPets from "./pages/GerenciarPets";
import FAQ from "./pages/FAQ";
import SejaVoluntarioInfo from "./pages/SejaVoluntarioInfo";
import FormularioVoluntario from "./pages/FormularioVoluntario";
import FimInscricao from "./pages/FimInscricao";
import Login from "./pages/Login";
import GerenciarVoluntarios from "./pages/GerenciarVoluntarios";
import GerenciarAdocoes from "./pages/GerenciarAdocoes";
import Relatorio from "./pages/Relatorio";
import GuiaRacas from "./pages/GuiaRacas";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quero-adotar" element={<QueroAdotar />} />
        <Route path="/termo-adocao" element={<TermoAdocao />} />
        <Route path="/formulario-adocao-1" element={<FormAdocao1 />} />
        <Route path="/formulario-adocao-2" element={<FormAdocao2 />} />
        <Route path="/confirmacao-adocao" element={<FimAdocao />} />
        
        <Route path="/faq" element={<FAQ />} />
        <Route path="/seja-voluntario" element={<SejaVoluntarioInfo />} />
        <Route path="/formulario-voluntario" element={<FormularioVoluntario />} />
        <Route path="/confirmacao-voluntario" element={<FimInscricao />} />
        
        <Route path="/guia-racas" element={<GuiaRacas />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/gerenciar-pets"
          element={
            <ProtectedRoute>
              <GerenciarPets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adicionar-pet"
          element={
            <ProtectedRoute>
              <AddPet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gerenciar-voluntarios"
          element={
            <ProtectedRoute>
              <GerenciarVoluntarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gerenciar-adocoes"
          element={
            <ProtectedRoute>
              <GerenciarAdocoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorio"
          element={
            <ProtectedRoute>
              <Relatorio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
