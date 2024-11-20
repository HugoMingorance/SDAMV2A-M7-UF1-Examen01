import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function NovaTascaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Nova Tasca Screen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
