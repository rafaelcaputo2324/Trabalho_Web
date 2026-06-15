import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cafofo_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Todos os campos são obrigatórios." };
    }
    if (!email.includes("@")) {
      return { success: false, message: "E-mail inválido." };
    }
    if (password.length < 6) {
      return { success: false, message: "A senha deve ter pelo menos 6 caracteres." };
    }
    
    const loggedUser = { email };
    setUser(loggedUser);
    localStorage.setItem("cafofo_user", JSON.stringify(loggedUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cafofo_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
