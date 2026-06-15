import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../src_styles/form.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow border-0 p-4" style={{ borderRadius: "15px" }}>
        <h2 className="text-center mb-4" style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
          Entrar no Cafofo
        </h2>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div className="form-group my-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white my-3"
            style={{ backgroundColor: "#6f42c1", borderRadius: "10px" }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
