import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useAluno } from "@/contexts/AlunoContext";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const API_URL = "https://app-pos-backend.onrender.com/disciplinas";

interface Disciplina {
  codigo: string;
  nome: string;
  ch: string;
  files: Array<string>;
}

const DownloadScreen = () => {
  const [loading, setLoading] = useState(false);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const { session } = useAluno();

  if (!session) {
    return <Text>Carregando...</Text>;
  }

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    try {
      const response = await axios.get(API_URL);
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao carregar disciplinas", error);
    }
  };

  //const pdfUrl =
  //  "https://educapes.capes.gov.br/bitstream/capes/560827/2/Apostila%20-%20Curso%20de%20L%C3%B3gica%20de%20Programa%C3%A7%C3%A3o.pdf";

  const downloadFile = async (pdfUrl: string) => {
    setLoading(true);
    try {
      // Define o caminho para salvar o arquivo
      const fileUri = `${FileSystem.documentDirectory}meu_arquivo.pdf`;

      // Faz o download do arquivo
      const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);

      setLoading(false);
      Alert.alert("Download concluído!", `Arquivo salvo em: ${uri}`);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao baixar arquivo:", error);
      Alert.alert("Erro", "Não foi possível baixar o arquivo.");
    }
  };

  const renderItem = ({
    item,
  }: {
    item: { nome: string; files: string[] };
  }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.nome} - Material</Text>
        <FlatList
          data={item.files}
          keyExtractor={(file, index) => `${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadFile(item)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Baixar</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.codigo}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#e3f5e0",
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#92E37C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DownloadScreen;
