import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

export default function EditTascaScreen({ route, navigation }) {
  const { task } = route.params; 
  const [title, setTitle] = useState(task.title);
  const [deadlineEnabled, setDeadlineEnabled] = useState(task.date !== "Sense data limit");
  const [deadline, setDeadline] = useState(task.date !== "Sense data limit" ? new Date(task.date) : null);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = async () => {
    if (title.trim() === "" || (deadlineEnabled && !deadline)) {
      alert("Has d'omplir tots els camps necessaris");
      return;
    }

    const updatedTask = {
      title,
      date: deadlineEnabled && deadline ? deadline.toLocaleDateString("ca-ES") : "Sense data limit",
      completed: task.completed, 
    };

    try {
      await updateDoc(doc(db, "ToDoList", task.id), updatedTask); 
      navigation.goBack(); 
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Introdueix el títol:</Text>
      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, deadlineEnabled && styles.checkboxChecked]}
          onPress={() => setDeadlineEnabled(!deadlineEnabled)}
        >
          {deadlineEnabled && <Text style={styles.checkboxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Data límit</Text>
      </View>

      {deadlineEnabled && (
        <>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {deadline ? deadline.toLocaleDateString("ca-ES") : "Selecciona una data"}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={deadline || new Date()} 
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(Platform.OS === "ios"); 
                if (selectedDate) {
                  setDeadline(selectedDate);
                }
              }}
            />
          )}
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Tornar Enrere</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  dateButton: {
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#007BFF",
    fontSize: 16,
    textAlign: "center",
  },
});
