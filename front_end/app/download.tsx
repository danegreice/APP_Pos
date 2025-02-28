import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  Platform,
} from "react-native";
import { useAluno } from "@/contexts/AlunoContext";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import axios from "axios";

const API_URL = "https://app-pos-backend.onrender.com/disciplinas";

interface Disciplina {
  codigo: string;
  nome: string;
  ch: string;
  files: Array<string>;
}

const DownloadScreen = () => {
  const [loadingItem, setLoadingItem] = useState<string | null>(null); // 🔹 Rastreia apenas um item
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

  const downloadFile = async (pdfUrl: string, codigo: string) => {
    setLoadingItem(codigo); // 🔹 Ativa o loading apenas para este item
    try {
      const filename = pdfUrl.split("/").pop();
      if (!filename) {
        throw new Error("Nome do arquivo inválido");
      }

      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const dirInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory!
      );
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory!, {
          intermediates: true,
        });
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        pdfUrl,
        fileUri
      );
      const downloadResponse = await downloadResumable.downloadAsync();

      if (downloadResponse?.uri) {
        await fileSave(downloadResponse.uri);
      }
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
      Alert.alert("Erro", "Não foi possível baixar o arquivo.");
    } finally {
      setLoadingItem(null); // 🔹 Desativa o loading quando terminar
    }
  };

  const fileSave = async (uri: string) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "Compartilhamento não disponível",
          "Não foi possível compartilhar o arquivo."
        );
      }
    }
  };

  const renderItem = ({ item }: { item: Disciplina }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.nome} - Material</Text>
        <FlatList
          data={item.files}
          keyExtractor={(file, index) => `${index}`}
          renderItem={({ item: fileUrl }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadFile(fileUrl, fileUrl)} // 🔹 Usa o URL como identificador
              disabled={loadingItem === fileUrl} // 🔹 Apenas este item fica desativado
            >
              {loadingItem === fileUrl ? (
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
