import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Importe o tipo correto
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAluno } from "@/contexts/AlunoContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const API_DISCIPLINAS = "https://app-pos-backend.onrender.com/disciplinas";
const API_NOTAS = "https://app-pos-backend.onrender.com/notas";

interface Aluno {
  _id: string;
  nome: string;
  idade: string;
  email: string;
  matricula: string;
  foto: string;
}

interface Historico {
  nome: string;
  nota: number;
  ch: string;
}

interface Nota {
  disciplina: string;
  nota: number;
  matricula: string;
}

interface Disciplina {
  codigo: string;
  nome: string;
  ch: string;
  files: Array<string>;
}

type RootStackParamList = {
  index: undefined;
  home: undefined;
  upload: undefined;
  download: undefined;
};

const DisciplinaItem: React.FC<Historico> = ({ nome, nota, ch }) => (
  <View style={styles.item}>
    <Text style={styles.nome}>{nome}</Text>
    <Text>Nota: {nota}</Text>
    <Text>Carga Horária: {ch}</Text>
  </View>
);

const HistoricoScreen = () => {
  const { session } = useAluno();
  const [aluno, setAluno] = useState<Aluno>();
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!session) {
    return <Text>Carregando...</Text>;
  }

  const API_ALUNO = `https://app-pos-backend.onrender.com/alunos/${session}`;

  const handleNavigate = () => {
    navigation.navigate("home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [disciplinasResponse, notasResponse, alunoResponse] =
          await Promise.all([
            axios.get(API_DISCIPLINAS),
            axios.get(API_NOTAS),
            axios.get(API_ALUNO),
          ]);

        const disciplinasData = disciplinasResponse.data;
        const notasData = notasResponse.data.filter(
          (item: Nota) => item.matricula === aluno?.matricula
        );

        setDisciplinas(disciplinasData);
        setNotas(notasData);
        setAluno(alunoResponse.data);

        const resultado = notasData.map((nota: Nota) => {
          const disciplina = disciplinasData.find(
            (disciplina: Disciplina) => disciplina.codigo === nota.disciplina
          );
          return {
            id: nota.disciplina,
            nome: disciplina!.nome,
            nota: nota.nota,
            ch: disciplina!.ch,
          };
        });
        setHistorico(resultado);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aluno]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <DisciplinaItem nome={item.nome} nota={item.nota} ch={item.ch} />
        )}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleNavigate}>
        <Text style={styles.uploadButtonText}>Ir para home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e3f5e0",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  uploadButton: {
    backgroundColor: "#92E37C",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HistoricoScreen;
