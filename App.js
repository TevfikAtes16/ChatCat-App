import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Header from "./screens/Header"; // Header bileşenini içe aktarın

const Stack = createNativeStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="ChatCat" component={HomeScreen} options={{
            header: () => <Header title="ChatCat" />, // Özel başlık bileşeni
          }} />
          <Stack.Screen name="Geçmiş" component={HistoryScreen} options={{
            header: () => <Header title="Geçmiş" />, // Özel başlık bileşeni
          }}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}
