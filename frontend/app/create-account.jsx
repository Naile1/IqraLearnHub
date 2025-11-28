import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateAccount() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateAccount = () => {
    router.push({
      pathname: "/profile",
      params: { fullName, email },
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join and begin your Islamic learning journey
      </Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createBtn} onPress={handleCreateAccount}>
        <Text style={styles.createBtnText}>Create Account</Text>
      </TouchableOpacity>

      {/* Already Have Account */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/log-in")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EF",
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  // Text Area
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    marginBottom: 24,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },

  // Button
  createBtn: {
    backgroundColor: "#1E3A8A", // Deep blue
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  createBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 17,
  },

  // Footer
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  bottomText: {
    color: "#6B7280",
    fontSize: 14,
  },
  loginLink: {
    color: "#1E3A8A",
    fontWeight: "600",
    fontSize: 14,
  },
});
