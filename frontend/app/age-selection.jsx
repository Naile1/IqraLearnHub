import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function AgeSelection() {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [subject, setSubject] = useState(null);

  const subjects = [
    "Islamic Studies",
    "Math",
    "Qur’an Understanding",
    "Science",
    "Coding",
    "Akhlaq & Manners",
  ];

  const startLearning = () => {
    const numericAge = parseInt(age);
    if (!numericAge || !subject) {
      Alert.alert("Selection Required", "Please enter your age and select a subject.");
      return;
    }
    if (numericAge < 3 || numericAge > 17) {
      Alert.alert("Invalid Age", "Please enter an age between 3 and 17.");
      return;
    }

    router.push({
      pathname: "/home-screen",
      params: {
        age: numericAge,
        subject,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/images/IqraLearnHub_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Greeting */}
      <View style={styles.greetingWrapper}>
        <Text style={styles.greeting}>Assalamu Alaikum!</Text>
        <Text style={styles.greetingSub}>Let's Begin Learning.</Text>
      </View>

      {/* Age Input */}
      <Text style={styles.sectionTitle}>Enter Your Age</Text>
      <TextInput
        style={styles.ageInput}
        placeholder="Type your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      {/* Subjects */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        I'm Interested In...
      </Text>
      <View style={styles.subjectWrapper}>
        {subjects.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSubject(s)}
            style={[styles.subjectPill, subject === s && styles.subjectPillSelected]}
          >
            <Text style={[styles.subjectText, subject === s && styles.subjectTextSelected]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startBtn} onPress={startLearning}>
        <Text style={styles.startBtnText}>Start Learning</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F4EF",
    padding: 20,
    paddingBottom: 60,
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    width: 120,
    height: 120,
  },
  greetingWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  greetingSub: {
    fontSize: 16,
    marginTop: 4,
    color: "#3B82F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E3A8A",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  ageInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1E3A8A",
  },
  subjectWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
    justifyContent: "start",
  },
  subjectPill: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#3B82F6",
    marginBottom: 10,
  },
  subjectPillSelected: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  subjectText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "500",
  },
  subjectTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  startBtn: {
    backgroundColor: "#1E3A8A",
    marginTop: 40,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  startBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
