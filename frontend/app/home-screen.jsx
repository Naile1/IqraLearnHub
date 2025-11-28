// HomeScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  

  // Safely parse age to number
  const age = params.age ? parseInt(params.age) : null;
  const subject = params.subject || "Not selected";
  const fullName = params.fullName || "Student";

  const [question, setQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("Ask a question!");
  const [answer, setAnswer] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState("Today's lesson will appear here.");
  const [activeDay, setActiveDay] = useState("Day 1");

  const API_URL = "https://iqralearnhub.onrender.com";

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem("history");
      if (stored) setHistory(JSON.parse(stored));
    };
    loadHistory();
  }, []);

  // Save history
  const saveHistory = async (newHistory) => {
    await AsyncStorage.setItem("history", JSON.stringify(newHistory));
  };

  
  // SEND QUESTION TO BACKEND
  
  const sendQuestion = async (q) => {
    const finalQuestion = q || question;
    if (!finalQuestion.trim()) return;

    if (!age) {
      Alert.alert("Error", "Invalid age. Please go back and select a valid age.");
      return;
    }

    setLoading(true);
    setCurrentQuestion(finalQuestion);
    setSelectedOption(null);

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age, // number
          subject,
          question: finalQuestion,
        }),
      });

      if (!res.ok) throw new Error("Network response not ok");

      const data = await res.json();

      setAnswer(data?.answer ?? "No answer.");
      setQuizOptions(data?.quiz ?? []);
      setLesson(data?.lesson ?? "Today's lesson will appear here.");

      const newHistory = [
        ...history,
        {
          day: activeDay,
          question: finalQuestion,
          answer: data?.answer ?? "No answer.",
          subject,
        },
      ];
      setHistory(newHistory);
      saveHistory(newHistory);
    } catch (e) {
      console.error(e);
      setAnswer("Network error. Try again.");
      setQuizOptions([]);
    } finally {
      setLoading(false);
    }
  };

  
  // HANDLE QUIZ OPTION CLICK
  
  const handleOptionPress = (option, index) => {
    setSelectedOption(index);
    sendQuestion(option);
  };

  
  // DAY SELECTION
  
  const days = ["Day 1", "Day 2", "Day 3"];
  const selectDay = (day) => setActiveDay(day);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>
        {/* Greeting */}
        <Text style={styles.greeting}>Assalamu Alaikum, {fullName}!</Text>
        <Text style={styles.subText}>
          Learning for: {age ?? "Not selected"} years — {subject}
        </Text>

        {/* Lesson of the Day */}
        <View style={styles.lessonCard}>
          <Text style={styles.lessonTitle}>Lesson of the Day:</Text>
          <Text style={styles.lessonText}>{lesson}</Text>
        </View>

        {/* Days */}
        <View style={styles.daysContainer}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => selectDay(day)}
              style={[
                activeDay === day ? styles.activeDayCard : styles.inactiveDayCard,
              ]}
            >
              <Text
                style={activeDay === day ? styles.activeDay : styles.inactiveDay}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Student Question */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Student's Question</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.badgeText}>
              {currentQuestion || "Your question will appear here..."}
            </Text>
          </View>
        </View>

        {/* IqraLearn Answer */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>IqraLearn’s Answer</Text>
          <View style={styles.answerCard}>
            <Text style={styles.answerText}>
              {loading ? "Thinking..." : answer || "Your answer will appear here..."}
            </Text>
          </View>
        </View>

        {/* Quiz Section */}
        <Text style={styles.quizTitle}>Ready for a quick quiz?</Text>
        {quizOptions.length === 0 ? (
          <Text style={styles.noQuizText}>Ask a question to generate quiz options!</Text>
        ) : (
          quizOptions.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.optionCard,
                selectedOption === idx &&
                  (answer.toLowerCase().includes("correct")
                    ? styles.correctOption
                    : styles.incorrectOption),
              ]}
              onPress={() => handleOptionPress(opt, idx)}
            >
              <Text style={styles.optionText}>
                {String.fromCharCode(65 + idx)}) {opt}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Input + Send */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => alert("Voice input not implemented yet.")}
          style={styles.micButton}
        >
          <Ionicons name="mic" size={20} color="#fff" />
        </TouchableOpacity>

        <TextInput
          placeholder="Ask your question here..."
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          onSubmitEditing={() => sendQuestion()}
        />

        <TouchableOpacity onPress={() => sendQuestion()} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1E3A8A" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/explore")}
        >
          <Ionicons name="search" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/progress")}
        >
          <Ionicons name="bar-chart" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/profile")}>
          <Ionicons name="person" size={24} color="#94A3B8" />
          <Text style={styles.navTextInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ----------------------
// STYLES
// ----------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  greeting: { fontSize: 24, fontWeight: "600", color: "#1E3A8A" },
  subText: { fontSize: 16, color: "#6B7280", marginTop: 4 },
  lessonCard: { backgroundColor: "#E0F2FE", padding: 16, borderRadius: 16, marginTop: 16 },
  lessonTitle: { fontWeight: "600", color: "#1E3A8A", marginBottom: 4 },
  lessonText: { color: "#1E3A8A", lineHeight: 20 },
  daysContainer: { flexDirection: "row", marginTop: 16, gap: 12 },
  activeDayCard: { padding: 8, borderRadius: 12, backgroundColor: "#DBEAFE" },
  inactiveDayCard: { padding: 8, borderRadius: 12, backgroundColor: "#F3F4F6" },
  activeDay: { color: "#1E3A8A", fontWeight: "600" },
  inactiveDay: { color: "#9CA3AF" },
  sectionHeader: { marginTop: 24, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
  sectionBadge: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  badgeText: { color: "#fff", fontWeight: "600", flexWrap: "wrap" },
  answerCard: { backgroundColor: "#DBEAFE", padding: 16, borderRadius: 24, marginTop: 4 },
  answerText: { color: "#1E3A8A", lineHeight: 22 },
  quizTitle: { fontSize: 20, fontWeight: "600", color: "#1E3A8A", marginTop: 24 },
  noQuizText: { marginTop: 12, fontSize: 16, color: "#6B7280" },
  optionCard: { borderWidth: 1, borderColor: "#1E3A8A", padding: 16, borderRadius: 16, marginTop: 12 },
  optionText: { color: "#1E3A8A", fontWeight: "500" },
  correctOption: { backgroundColor: "#DCFCE7", borderColor: "#22C55E" },
  incorrectOption: { backgroundColor: "#FEE2E2", borderColor: "#DC2626" },
  inputContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  micButton: { padding: 12, borderRadius: 30, marginRight: 8, backgroundColor: "#1E3A8A" },
  input: { flex: 1, backgroundColor: "#F3F4F6", padding: 12, borderRadius: 16 },
  sendButton: { backgroundColor: "#1E3A8A", padding: 12, borderRadius: 999, marginLeft: 8 },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  navItem: { alignItems: "center" },
  navTextActive: { fontSize: 12, color: "#1E3A8A", marginTop: 4 },
  navTextInactive: { fontSize: 12, color: "#9CA3AF", marginTop: 4 },
});
