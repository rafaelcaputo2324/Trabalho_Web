import { db } from "./firebase";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

export const MODO_SIMULADO = false;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function enviarDocumento(colecao, id, dados) {
  if (MODO_SIMULADO) {
    await esperar(300);
    console.log(`[Firestore SIMULADO] setDoc ${colecao}/${id}`, dados);
    return;
  }
  await setDoc(doc(db, colecao, id), dados);
}

export async function excluirDocumento(colecao, id) {
  if (MODO_SIMULADO) {
    await esperar(300);
    console.log(`[Firestore SIMULADO] deleteDoc ${colecao}/${id}`);
    return;
  }
  await deleteDoc(doc(db, colecao, id));
}

export async function buscarColecao(colecao) {
  if (MODO_SIMULADO) {
    console.log(`[Firestore SIMULADO] getDocs ${colecao} (nada para baixar)`);
    return null;
  }
  const snapshot = await getDocs(collection(db, colecao));
  return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
}
