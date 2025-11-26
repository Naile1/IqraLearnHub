import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function AgeSelectionScreen({ navigation }) {
  const [ageGroup, setAgeGroup] = useState(null);
  const [interests, setInterests] = useState([]);

  const interestOptions = [
    "Islamic Studies",
    "Math",
    "Qur’an Understanding",
    "Science",
    "Coding",
    "Akhlaq & Manners",
  ];

  const toggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar + Greeting */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={60} color="#1E90FF" />
          
        </View>
        <Text style={styles.title}>Assalamu Alaikum!</Text>
        <Text style={styles.subtitle}>Let’s Begin Learning.</Text>
      </View>

      {/* Age Group */}
      <Text style={styles.sectionTitle}>Select Your Age Group</Text>

      {["10-12 Years Old", "13-16 Years Old", "17+ Years Old"].map((group, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.ageButton,
            ageGroup === group && styles.ageButtonActive
          ]}
          onPress={() => setAgeGroup(group)}
        >
          <Text
            style={[
              styles.ageButtonText,
              ageGroup === group && styles.ageButtonTextActive
            ]}
          >
            {group}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Interests */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        I'm Interested In...
      </Text>

      <View style={styles.interestsContainer}>
        {interestOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.interestTag,
              interests.includes(item) && styles.interestTagActive
            ]}
            onPress={() => toggleInterest(item)}
          >
            <Text
              style={[
                styles.interestText,
                interests.includes(item) && styles.interestTextActive
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.startButton}>
        <Link href="/home-screen">
        <Text style={styles.startButtonText}>Start Learning</Text>
        </Link>
       
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 50,
    backgroundColor: "#F0F7FF",
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 40,
  },

  avatar: {
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 15,
    color: "#1E3A8A",
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
    color: "#003366",
  },

  ageButton: {
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1E90FF",
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  ageButtonActive: {
    backgroundColor: "#1E90FF",
  },

  ageButtonText: {
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "600",
  },

  ageButtonTextActive: {
    color: "#FFFFFF",
  },

  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  interestTag: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1E90FF",
  },

  interestTagActive: {
    backgroundColor: "#1E90FF",
  },

  interestText: {
    color: "#1E90FF",
    fontWeight: "500",
    fontSize: 13,
  },

  interestTextActive: {
    color: "#FFFFFF",
  },

  startButton: {
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
