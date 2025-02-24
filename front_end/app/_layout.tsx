import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./index"; // Corrija o caminho conforme sua estrutura de pastas
import HomeScreen from "./home"; // Corrija o caminho conforme sua estrutura de pastas
import HistoricoScreen from "./historico";
import DownloadScreen from "./download";
import UploadScreen from "./upload";
import { AlunoProvider } from "@/contexts/AlunoContext";

type RootStackParamList = {
  index: undefined; // Parâmetros para a tela 'index' (não há parâmetros aqui)
  home: undefined; // Parâmetros para a tela 'home' (não há parâmetros aqui)
  historico: undefined;
  upload: undefined;
  download: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <AlunoProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={IndexScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="historico"
          component={HistoricoScreen}
          options={{ title: "Histórico" }}
        />
        <Stack.Screen
          name="download"
          component={DownloadScreen}
          options={{ title: "Downloads" }}
        />
        <Stack.Screen
          name="upload"
          component={UploadScreen}
          options={{ title: "Downloads" }}
        />
      </Stack.Navigator>
    </AlunoProvider>
  );
}
