// AgeSelection.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function AgeSelection() {
  const router = useRouter();

  const [age, setAge] = useState(null);
  const [subject, setSubject] = useState(null);

  const ages = [10, 11, 12, 13, 14, 15, 16];
  const subjects = ["Islam", "Math", "Science", "English"];

  const startLearning = () => {
    if (!age || !subject) {
      alert("Please select both age and subject.");
      return;
    }

    // Navigate to home-screen with params
    router.push({
      pathname: "/home-screen",
      params: { age: age.toString(), subject },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Age</Text>
      <View style={styles.optionsContainer}>
        {ages.map((a) => (
          <TouchableOpacity
            key={a}
            style={[styles.optionCard, age === a && styles.optionSelected]}
            onPress={() => setAge(a)}
          >
            <Text style={[styles.optionText, age === a && styles.optionTextSelected]}>
              {a} years
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 24 }]}>Select Subject</Text>
      <View style={styles.optionsContainer}>
        {subjects.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.optionCard, subject === s && styles.optionSelected]}
            onPress={() => setSubject(s)}
          >
            <Text style={[styles.optionText, subject === s && styles.optionTextSelected]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startLearning}>
        <Text style={styles.startButtonText}>Start Learning</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// -------- Styles --------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 12,
  },
  optionCard: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: "#1E3A8A",
  },
  optionText: {
    color: "#1E3A8A",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#fff",
  },
  startButton: {
    marginTop: 40,
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
