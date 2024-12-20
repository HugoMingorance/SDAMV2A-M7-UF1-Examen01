import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NovaTascaScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [deadlineEnabled, setDeadlineEnabled] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [showPicker, setShowPicker] = useState(false); // Controla si es mostra el date picker

  const { addTask } = route.params;

  const handleSave = () => {
    if (title.trim() === "" || (deadlineEnabled && !deadline)) {
      alert("Has d'omplir tots els camps necessaris");
      return;
    }
    addTask(title, deadlineEnabled && deadline ? deadline.toLocaleDateString("ca-ES") : "Sense data limit");
    navigation.goBack(); // Regresa a la pantalla anterior
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
              value={deadline || new Date()} // Data actual per defecte
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(Platform.OS === "ios"); // Manté el picker o l'oculta
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
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
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
    borderColor: "#333",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
