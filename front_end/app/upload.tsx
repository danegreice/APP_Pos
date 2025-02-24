import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const DocumentUploadScreen = () => {
  const [document, setDocument] = useState<any>(null);

  // Função para abrir o seletor de arquivos
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Para permitir qualquer tipo de documento
      });

      if (result.canceled) {
        // Verifica se o status é 'success'
        console.log("Seleção de documento cancelada");
      } else {
        setDocument(result); // Armazena os detalhes do documento selecionado
      }
    } catch (error) {
      console.error("Erro ao selecionar o documento: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload de Documentos</Text>

      <Button title="Selecionar Documento" onPress={pickDocument} />

      {document && (
        <View style={styles.documentDetails}>
          <Text style={styles.documentText}>Documento selecionado:</Text>
          <Text style={styles.documentText}>Nome: {document.name}</Text>
          <Text style={styles.documentText}>Tipo: {document.mimeType}</Text>
          <Text style={styles.documentText}>
            Tamanho: {document.size} bytes
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  documentDetails: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  documentText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DocumentUploadScreen;
