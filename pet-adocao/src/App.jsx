import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import QueroAdotar from "./pages/QueroAdotar";
import TermoAdocao from "./pages/TermoAdocao";
import FormAdocao1 from "./pages/FormAdocao1";
import FormAdocao2 from "./pages/FormAdocao2";
import FimAdocao from "./pages/FimAdocao";
import AddPet from "./pages/AddPet";
import FAQ from "./pages/FAQ";
import SejaVoluntarioInfo from "./pages/SejaVoluntarioInfo";
import FormularioVoluntario from "./pages/FormularioVoluntario";
import FimInscricao from "./pages/FimInscricao";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quero-adotar" element={<QueroAdotar />} />
        <Route path="/termo-adocao" element={<TermoAdocao />} />
        <Route path="/formulario-adocao-1" element={<FormAdocao1 />} />
        <Route path="/formulario-adocao-2" element={<FormAdocao2 />} />
        <Route path="/confirmacao-adocao" element={<FimAdocao />} />
        <Route path="/adicionar-pet" element={<AddPet />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/seja-voluntario" element={<SejaVoluntarioInfo />} />
        <Route path="/formulario-voluntario" element={<FormularioVoluntario />} />
        <Route path="/confirmacao-voluntario" element={<FimInscricao />} />
      </Routes>
    </>
  );
}

export default App;