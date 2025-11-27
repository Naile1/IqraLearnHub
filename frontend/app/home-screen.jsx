import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  // Get age and subject from route params
  const { age = "Not selected", subject = "Not selected" } = useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);

  const API_URL = "https://iqralearnhub.onrender.com";

  // Send question to backend
  const sendQuestion = async () => {
    if (!question.trim()) return;

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, subject, question }),
      });

      const data = await res.json();
      console.log("API data:", data);

      setAnswer(data?.answer ?? "No answer.");
      setQuizOptions(data?.quiz ?? []); // Directly use AI quiz options
    } catch (e) {
      console.error("Network error:", e);
      setAnswer("Network error.");
      setQuizOptions([]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>
        {/* Greeting */}
        <Text style={styles.greeting}>Assalamu Alaikum, Aisha!</Text>
        <Text style={styles.subText}>
          Learning for: {age} years — {subject}
        </Text>

        {/* Days */}
        <View style={styles.daysContainer}>
          <Text style={styles.activeDay}>Day 1</Text>
          <Text style={styles.inactiveDay}>Day 2</Text>
          <Text style={styles.inactiveDay}>Day 3</Text>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>IqraLearn’s Answer</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.badgeText}>Who was?</Text>
          </View>
        </View>

        {/* Answer Card */}
        <View style={styles.answerCard}>
          <Text style={styles.answerText}>{answer || "Your answer will appear here..."}</Text>
        </View>

        {/* Quiz Section */}
        <Text style={styles.quizTitle}>Ready for a quick quiz?</Text>

        {/* AI-generated options */}
        {quizOptions.length === 0 && (
          <Text style={styles.noQuizText}>Ask a question to generate quiz options!</Text>
        )}

        {quizOptions.map((opt, idx) => (
          <TouchableOpacity key={idx} style={styles.optionCard}>
            <Text style={styles.optionText}>
              {String.fromCharCode(65 + idx)}) {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask your question here..."
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          onSubmitEditing={sendQuestion}
        />
        <TouchableOpacity onPress={sendQuestion} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1E3A8A" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// -------- Styles --------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  greeting: { fontSize: 24, fontWeight: "600", color: "#1E3A8A" },
  subText: { fontSize: 16, color: "#6B7280", marginTop: 4 },
  daysContainer: { flexDirection: "row", marginTop: 16, gap: 12 },
  activeDay: { color: "#1E3A8A", fontWeight: "600" },
  inactiveDay: { color: "#9CA3AF" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
  sectionBadge: { backgroundColor: "#1E3A8A", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  badgeText: { color: "#fff", fontWeight: "600" },
  answerCard: { backgroundColor: "#DBEAFE", padding: 16, marginTop: 16, borderRadius: 24 },
  answerText: { color: "#1E3A8A", lineHeight: 22 },
  quizTitle: { fontSize: 20, fontWeight: "600", color: "#1E3A8A", marginTop: 24 },
  noQuizText: { marginTop: 12, fontSize: 16, color: "#6B7280" },
  optionCard: { borderWidth: 1, borderColor: "#1E3A8A", padding: 16, borderRadius: 16, marginTop: 12 },
  optionText: { color: "#1E3A8A", fontWeight: "500" },
  inputContainer: { position: "absolute", bottom: 80, left: 0, right: 0, flexDirection: "row", backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderColor: "#E5E7EB", alignItems: "center" },
  input: { flex: 1, backgroundColor: "#F3F4F6", padding: 12, borderRadius: 16 },
  sendButton: { backgroundColor: "#1E3A8A", padding: 12, borderRadius: 999, marginLeft: 8 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 12, borderTopWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#fff" },
  navItem: { alignItems: "center" },
  navTextActive: { fontSize: 12, color: "#1E3A8A", marginTop: 4 },
  navTextInactive: { fontSize: 12, color: "#9CA3AF", marginTop: 4 },
});
