import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";

// Importa les dependències de Firebase
import { db } from './utils/firebaseConfig'; // Assegura't que la configuració de Firebase estigui correcta
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// Importa les dependències de navegació
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa NovaTascaScreen
import NovaTascaScreen from "./components/Screens/novaTascaScreen.js";

// Define el stack de navegació
const Stack = createNativeStackNavigator();

// Pantalla inicial (HomeScreen)
function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Recuperar tasques de Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ToDoList"));
        const tasksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksList);
      } catch (error) {
        console.error("Error recuperant tasques:", error);
      }
    };

    fetchTasks();
  }, []);

  // Elimina una tasca per la seva ID
  const handleDelete = (id) => {
    Alert.alert(
      "¿Estás segur de que vols eliminar la tasca?",
      "Perdràs totes les dades.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Acció cancel·lada"),
          style: "cancel"
        },
        { 
          text: "Acceptar", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "ToDoList", id));
              setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
              console.log("Tasca eliminada");
            } catch (error) {
              console.error("Error eliminant tasca:", error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  // Alterna l'estat de completat d'una tasca
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Funció per afegir una nova tasca
  const addTask = async (title, date) => {
    try {
      // Afegeix una nova tasca a Firestore
      const docRef = await addDoc(collection(db, "ToDoList"), {
        title,
        date,
        completed: false,
      });
      console.log("Tasca afegida correctament:", docRef.id);
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: docRef.id, title, date, completed: false },
      ]);
    } catch (error) {
      console.error("Error afegint tasca:", error);
    }
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
        onPress={() => navigation.navigate("NovaTascaScreen", { addTask })}
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

// Estils
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
