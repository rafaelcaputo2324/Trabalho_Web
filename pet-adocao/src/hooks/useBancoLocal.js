import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { listar } from "../services/repositorio";
import { aoAlterarDados, aoMudarEstado, obterEstado } from "../services/syncService";

export function useDadosLocais(ler) {
  const lerRef = useRef(ler);
  useLayoutEffect(() => {
    lerRef.current = ler;
  });
  const [dados, setDados] = useState(() => ler());

  useEffect(() => {
    const recarregar = () => setDados(lerRef.current());
    recarregar();
    return aoAlterarDados(recarregar);
  }, []);

  return dados;
}

export function useTabela(entidade) {
  return useDadosLocais(() => listar(entidade));
}

export function useEstadoSync() {
  return useSyncExternalStore(aoMudarEstado, obterEstado);
}
