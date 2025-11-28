import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

export default function ExploreScreen() {
  const { fullName = "Student" } = useLocalSearchParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem("history");
      if (stored) setHistory(JSON.parse(stored));
    };
    loadHistory();
  }, []);

  // Delete a single history item
  const deleteLesson = async (itemToDelete) => {
    Alert.alert(
      "Delete Lesson",
      "Are you sure you want to delete this lesson?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const newHistory = history.filter(
              (item) => item !== itemToDelete
            );
            setHistory(newHistory);
            await AsyncStorage.setItem("history", JSON.stringify(newHistory));
          },
        },
      ]
    );
  };

  // Group history by day then by subject
  const grouped = history.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = {};
    if (!acc[item.day][item.subject]) acc[item.day][item.subject] = [];
    acc[item.day][item.subject].push(item);
    return acc;
  }, {});

  const days = Object.keys(grouped);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Explore Lessons, {fullName}</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {days.length === 0 ? (
          <Text style={styles.noLessonsText}>
            No lessons yet. Ask a question to generate lessons!
          </Text>
        ) : (
          days.map((day) => (
            <View key={day} style={styles.daySection}>
              <Text style={styles.dayTitle}>{day}</Text>
              {Object.keys(grouped[day]).map((subject) => (
                <View key={subject} style={styles.subjectSection}>
                  <Text style={styles.subjectTitle}>{subject}</Text>
                  {grouped[day][subject].map((item, idx) => (
                    <View key={idx} style={styles.lessonRow}>
                      <TouchableOpacity
                        style={styles.lessonCard}
                        onPress={() =>
                          Alert.alert(
                            "Lesson Details",
                            `Q: ${item.question}\n\nA: ${item.answer}`
                          )
                        }
                      >
                        <Text style={styles.lessonQuestion}>{item.question}</Text>
                        {/* <Ionicons name="chevron-forward" size={24} color="#1E3A8A" /> */}
                      </TouchableOpacity>

                      {/* Delete button */}
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deleteLesson(item)}
                      >
                        <Ionicons name="trash-outline" size={22} color="#DC2626" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F4EF", padding: 14, paddingTop: 40 },
  greeting: { fontSize: 22, fontWeight: "600", color: "#1E3A8A", marginBottom: 16 },
  noLessonsText: { fontSize: 16, color: "#6B7280", marginTop: 16 },
  daySection: { marginBottom: 24 },
  dayTitle: { fontSize: 18, fontWeight: "700", color: "#1E40AF", marginBottom: 8 },
  subjectSection: { marginBottom: 16 },
  subjectTitle: { fontSize: 16, fontWeight: "600", color: "#1E3A8A", marginBottom: 8 },
  lessonRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  lessonCard: {
    flex: 1,
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonQuestion: { fontSize: 16, color: "#1E3A8A", fontWeight: "500" },
  deleteBtn: {
    marginLeft: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
