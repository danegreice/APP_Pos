import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Importe o tipo correto
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker"; // Biblioteca para upload de foto
import { useNavigation } from "@react-navigation/native";
import { useAluno } from "@/contexts/AlunoContext";
import { Picker } from "@react-native-picker/picker"; // Para seleção de tela
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
  index: undefined;
  upload: undefined;
  download: undefined;
};

const HomeScreen = () => {
  const [photo, setPhoto] = useState<any>(null); // Foto do aluno
  const [aluno, setAluno] = useState<Aluno>();
  const [selectedScreen, setSelectedScreen] = useState<string>(""); // Tela selecionada
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { session } = useAluno();

  if (!session) {
    return <Text>Carregando...</Text>;
  }

  const API_URL = `http://localhost:5000/alunos/${session}`;

  useEffect(() => {
    fetchAluno();
  }, []);

  const fetchAluno = async () => {
    try {
      const response = await axios.get(API_URL);
      setAluno(response.data);
    } catch (error) {
      console.error("Erro ao carregar alunos", error);
    }
  };

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User canceled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Verificação de 'assets'
        setPhoto(response.assets[0]);
      } else {
        console.log("Nenhuma imagem foi selecionada");
      }
    });
  };

  // Função para navegar para a tela selecionada
  const handleNavigate = () => {
    if (selectedScreen) {
      navigation.navigate(selectedScreen as keyof RootStackParamList);
    } else {
      Alert.alert("Erro", "Por favor, selecione uma tela para ir.");
    }
  };

  const handleExit = () => {
    navigation.reset({ index: 0, routes: [{ name: "index" }] });
    localStorage.clear();
  };

  return (
    <View style={styles.container}>
      {/* Mensagem de boas-vindas */}
      <View style={styles.cabecalho}>
        <Text style={styles.welcomeText}>Bem-vindo, {aluno?.nome}!</Text>

        {/* Exibir a foto selecionada */}
        <TouchableOpacity onPress={selectPhoto}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>Selecione uma foto</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        {/* Seletor de tela */}
        <Picker
          selectedValue={selectedScreen}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedScreen(itemValue)}
        >
          <Picker.Item label="Escolha a tela" value="" />
          <Picker.Item label="Histórico" value="historico" />
          <Picker.Item label="Upload" value="upload" />
          <Picker.Item label="Download" value="download" />
        </Picker>

        {/* Botão para navegar para a tela selecionada */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleNavigate}>
          <Text style={styles.uploadButtonText}>
            Ir para a tela selecionada
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.uploadButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#e3f5e0",
  },
  cabecalho: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conteudo: {
    flex: 1,
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 10,
    color: "#777",
    marginTop: 15,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#92E37C",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  exitButton: {
    backgroundColor: "#ff0000",
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
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 20,
  },
});

export default HomeScreen;
