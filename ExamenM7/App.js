import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import React, { useState } from "react";

// Importa las dependencias de navegación
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa NovaTascaScreen
import NovaTascaScreen from "./components/Screens/novaTascaScreen.js";

// Define el stack de navegación
const Stack = createNativeStackNavigator();

// Pantalla inicial (HomeScreen)
function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "ToDo1", date: "20/11/2024", completed: false },
  ]);

  // Elimina una tarea por su ID
  const handleDelete = (id) => {
    Alert.alert(
      "¿Estás segur de que vols eliminar la tasca?",  
      "Perdràs totes les dades.",  
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Acción cancelada"),
          style: "cancel"
        },
        { 
          text: "Acceptar", 
          onPress: () => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
        }
      ],
      { cancelable: true }
    );
  };

  // Alterna el estado de completado de una tarea
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Función para agregar una nueva tarea
  const addTask = (title, date) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: (prevTasks.length + 1).toString(), title, date, completed: false },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.checkbox, item.completed && styles.checked]}>
                {item.completed ? "✓" : " "}
              </Text>
            </TouchableOpacity>
            <View style={styles.taskDetails}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.date !== "Sense data limit" ? `${item.title} - ${item.date}` : item.title}
              </Text>
            </View>
            <Button
              title="Eliminar"
              color="#ff4d4d"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("NovaTascaScreen", { addTask })
        }
      >
        <Text style={styles.addButtonText}>+ Nova Tasca</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
          options={{ animation: 'none', headerShown: false }}
        />
        <Stack.Screen
          name="NovaTascaScreen"
          component={NovaTascaScreen}
          options={{ animation: 'none', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    marginRight: 12,
    fontSize: 18,
    lineHeight: 24,
  },
  checked: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

