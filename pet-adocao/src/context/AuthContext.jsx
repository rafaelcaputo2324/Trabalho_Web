import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "../services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email.split("@")[0]
          });
          localStorage.setItem(
            "cafofo_user",
            JSON.stringify({
              uid: currentUser.uid,
              email: currentUser.email
            })
          );
        } else {
          const demoUser = localStorage.getItem("cafofo_user_demo");
          if (demoUser) {
            setUser(JSON.parse(demoUser));
          } else {
            setUser(null);
            localStorage.removeItem("cafofo_user");
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch {
      const saved = localStorage.getItem("cafofo_user");
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
    }
  }, []);

  const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "E-mail inválido. Verifique o formato digitado.";
      case "auth/user-not-found":
        return "Nenhum usuário encontrado com este e-mail.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "E-mail ou senha incorretos.";
      case "auth/email-already-in-use":
        return "Este e-mail já está cadastrado.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      case "auth/network-request-failed":
        return "Falha de conexão com a rede.";
      default:
        return "Falha na autenticação. Verifique os dados e tente novamente.";
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Todos os campos são obrigatórios." };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const logged = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email.split("@")[0]
      };
      setUser(logged);
      localStorage.removeItem("cafofo_user_demo");
      return { success: true, user: logged };
    } catch (error) {
      if (error.code === "auth/api-key-not-valid" || error.code?.includes("api-key")) {
        const demoUser = {
          uid: "uid-" + Date.now(),
          email,
          displayName: email.split("@")[0]
        };
        setUser(demoUser);
        localStorage.setItem("cafofo_user_demo", JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }
      return { success: false, message: getFirebaseErrorMessage(error) };
    }
  };

  const register = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Todos os campos são obrigatórios." };
    }
    if (password.length < 6) {
      return { success: false, message: "A senha deve conter no mínimo 6 caracteres." };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email.split("@")[0]
      };
      setUser(newUser);
      localStorage.removeItem("cafofo_user_demo");
      return { success: true, user: newUser };
    } catch (error) {
      if (error.code === "auth/api-key-not-valid" || error.code?.includes("api-key")) {
        const demoUser = {
          uid: "uid-" + Date.now(),
          email,
          displayName: email.split("@")[0]
        };
        setUser(demoUser);
        localStorage.setItem("cafofo_user_demo", JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }
      return { success: false, message: getFirebaseErrorMessage(error) };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignora erro de signOut
    }
    setUser(null);
    localStorage.removeItem("cafofo_user");
    localStorage.removeItem("cafofo_user_demo");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
