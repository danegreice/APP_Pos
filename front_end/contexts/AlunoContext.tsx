import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem("session");
    return token || ""; // Retorna uma string vazia se não houver token
  } catch (error) {
    console.log("Erro ao recuperar o token: ", error);
    return "";
  }
};

export const setSessionInLocalStorage = async (token: string) => {
  try {
    await AsyncStorage.setItem("session", token);
    return true;
  } catch (error) {
    console.log("Erro ao salvar token: ", error);
  }
};

// Criar um Provider para envolver o aplicativo e fornecer o contexto
export const AlunoProvider = ({ children }: { children: ReactNode }) => {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [session, setSession] = useState<string>(""); // Agora session começa como string

  // Carregar o token da sessão quando o componente for montado
  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await getSession();
      setSession(storedToken);
    };
    loadSession();
  }, []);

  const setAuth = (token: string): void => {
    setSession(token); // Agora aceita string corretamente
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
