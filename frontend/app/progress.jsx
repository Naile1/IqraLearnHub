import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

export default function ProgressScreen() {
  const { fullName = "Student" } = useLocalSearchParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem("history");
      if (stored) setHistory(JSON.parse(stored));
    };
    loadHistory();
  }, []);

  // Group history by day
  const groupedByDay = history.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {});

  const days = Object.keys(groupedByDay);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{fullName}'s Progress</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {days.length === 0 ? (
          <Text style={styles.noProgressText}>No progress yet. Ask questions to start learning!</Text>
        ) : (
          days.map((day) => {
            const total = groupedByDay[day].length;
            const completed = groupedByDay[day].filter((h) =>
              h.answer.toLowerCase().includes("correct") ||
              h.answer.toLowerCase().includes("answered")
            ).length;
            const percentage = Math.round((completed / total) * 100);
            return (
              <View key={day} style={styles.dayCard}>
                <Text style={styles.dayTitle}>{day}</Text>
                <Text style={styles.progressText}>
                  {completed}/{total} questions completed ({percentage}%)
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F4EF", padding: 20, paddingTop: 40 },
  greeting: { fontSize: 22, fontWeight: "600", color: "#1E3A8A", marginBottom: 16 },
  noProgressText: { fontSize: 16, color: "#6B7280", marginTop: 16 },
  dayCard: { backgroundColor: "#E0F2FE", padding: 16, borderRadius: 16, marginBottom: 16 },
  dayTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A", marginBottom: 4 },
  progressText: { fontSize: 16, color: "#1E3A8A" },
});
