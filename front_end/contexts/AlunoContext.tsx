import React, { createContext, useState, ReactNode, useContext } from "react";

// Definir o tipo para o aluno
interface Aluno {
  _id: string;
  nome: string;
  idade: string;
  email: string;
  matricula: string;
  foto: string;
}

// Definir os tipos para o Contexto
interface AlunoContextData {
  session: string;
  aluno: Aluno | null;
  setAluno: (aluno: Aluno) => void;
  setAuth: (token: string) => void;
}

// Criar o Contexto com valor padrão
const AlunoContext = createContext<AlunoContextData | undefined>(undefined);

export const getSession = () => {
  return JSON.parse(localStorage.getItem("session")!);
};

export const setSessionInLocalStorage = (token: string) => {
  localStorage.setItem("session", JSON.stringify(token));
  return true;
};

// Criar um Provider para envolver o aplicativo e fornecer o contexto
export const AlunoProvider = ({ children }: { children: ReactNode }) => {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const auth = getSession();
  const [session, setSession] = useState(auth || "");

  const setAuth = (token: string): void => {
    setSession(token);
    setSessionInLocalStorage(token);
  };

  return (
    <AlunoContext.Provider value={{ session, aluno, setAluno, setAuth }}>
      {children}
    </AlunoContext.Provider>
  );
};

// Criar um hook para acessar o contexto de forma mais fácil
export const useAluno = (): AlunoContextData => {
  const context = useContext(AlunoContext);
  if (!context) {
    throw new Error("useAluno must be used within an AlunoProvider");
  }
  return context;
};
