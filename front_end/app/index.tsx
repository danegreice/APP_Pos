import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Importe o tipo correto
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useAluno } from "@/contexts/AlunoContext";
import axios from "axios";

interface Aluno {
  _id: string;
  nome: string;
  idade: string;
  email: string;
  matricula: string;
  foto: string;
}

type RootStackParamList = {
  index: { aluno: Aluno };
  home: undefined;
};

const API_URL = "https://app-pos-backend.onrender.com/alunos";

const IndexScreen = () => {
  const [matricula, setMatricula] = useState("");
  const [error, setError] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const { setAluno, setAuth } = useAluno();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "home">>();

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao carregar alunos", error);
    }
  };

  const handleLogin = () => {
    // Aqui você pode colocar a lógica de login
    const alunoEncontrado = alunos.find(
      (aluno) => aluno.matricula == matricula
    );
    if (alunoEncontrado) {
      setAluno(alunoEncontrado);
      setAuth(alunoEncontrado._id);
      navigation.navigate("home"); // Navegar para a tela "home"
    } else {
      setError("Matrícula não encontrada");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/Portal_Iteam_Logo.jpg")} // Substitua pelo link da sua logo
        style={styles.logo}
      />

      {/* Campo de matricula */}
      <TextInput
        style={styles.input}
        placeholder="Matricula"
        value={matricula}
        onChangeText={setMatricula}
      />

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {error != "" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e3f5e0",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#92E37C",
    textAlign: "center",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "#ff0000",
    marginTop: 10,
  },
});

export default IndexScreen;
