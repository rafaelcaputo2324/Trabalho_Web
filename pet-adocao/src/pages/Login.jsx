import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../src_styles/form.css";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);

    try {
      if (isRegistering) {
        const result = await register(email, password);
        if (result.success) {
          setSuccess("Conta criada com sucesso!");
          setTimeout(() => navigate("/"), 1000);
        } else {
          setError(result.message);
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          navigate("/");
        } else {
          setError(result.message);
        }
      }
    } catch {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "460px" }}>
      <div className="card shadow border-0 p-4" style={{ borderRadius: "15px" }}>
        <div className="text-center mb-3">
          <img src="/img/logo1.png" alt="Cafofo" height="55" className="mb-2" />
          <h2 style={{ fontFamily: "'Baloo', cursive", color: "#6f42c1" }}>
            {isRegistering ? "Criar Conta" : "Entrar no Cafofo"}
          </h2>
          <small className="text-muted">
            {isRegistering ? "Cadastre-se para gerenciar os dados" : "Acesse seu perfil de administração"}
          </small>
        </div>

        <div className="d-flex mb-3 border rounded overflow-hidden">
          <button
            type="button"
            className={`btn flex-fill rounded-0 ${!isRegistering ? "btn-primary" : "btn-light"}`}
            style={{ backgroundColor: !isRegistering ? "#6f42c1" : "#f8f9fa", borderColor: "#6f42c1" }}
            onClick={() => {
              setIsRegistering(false);
              setError("");
              setSuccess("");
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`btn flex-fill rounded-0 ${isRegistering ? "btn-primary" : "btn-light"}`}
            style={{ backgroundColor: isRegistering ? "#6f42c1" : "#f8f9fa", borderColor: "#6f42c1" }}
            onClick={() => {
              setIsRegistering(true);
              setError("");
              setSuccess("");
            }}
          >
            Cadastrar
          </button>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2 small" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="font-weight-bold">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group mb-3">
            <label className="font-weight-bold">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={submitting}
            />
          </div>

          {isRegistering && (
            <div className="form-group mb-3">
              <label className="font-weight-bold">Confirmar Senha</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita sua senha"
                required
                disabled={submitting}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn w-100 text-white my-3"
            style={{ backgroundColor: "#6f42c1", borderRadius: "10px", fontWeight: "bold" }}
            disabled={submitting}
          >
            {submitting ? "Carregando..." : isRegistering ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-2">
          <small className="text-muted">
            {isRegistering ? "Já possui uma conta? " : "Ainda não tem conta? "}
            <button
              type="button"
              className="btn btn-link p-0"
              style={{ color: "#6f42c1", verticalAlign: "baseline" }}
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setSuccess("");
              }}
            >
              {isRegistering ? "Faça login" : "Criar uma conta"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}
