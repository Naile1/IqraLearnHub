import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Log in to continue your learning journey
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push("./age-selection")}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Go to Signup */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("./create-account")}>
          <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingTop: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#1E3A8A", // deep blue
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  signupText: {
    color: "#6B7280",
  },
  signupLink: {
    color: "#1E3A8A", // deep blue
    fontWeight: "600",
  },
});
