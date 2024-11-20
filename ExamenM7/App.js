import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

// Importa las dependencias de navegación
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa NovaTascaScreen
import NovaTascaScreen from "./components/Screens/novaTascaScreen.js";

// Define el stack de navegación
const Stack = createNativeStackNavigator();

// Pantalla inicial (HomeScreen)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate("NovaTascaScreen")} // Navega a NovaTascaScreen
      >
        Go to Nova Tasca Screen
      </Text>
    </View>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="NovaTascaScreen" 
          component={NovaTascaScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 20,
    color: "blue",
    fontSize: 18,
  },
});
