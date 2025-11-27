import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Logo() {
  return (
    <View style={styles.container}>
      {/* Icon Circle */}
      <View style={styles.circle}>
        <Link href="/age-selection">
          <Text style={styles.circleText}>IQ</Text>
        </Link>
      </View>

      {/* Text */}
      <Text style={styles.title}>
        Iqra<Text style={styles.highlight}>Learn</Text>Hub
      </Text>

      <Text style={styles.subtitle}>Learn • Grow • Excel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 90,
    backgroundColor: "#E8F3FF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1E40AF",
    justifyContent: "center",
    alignItems: "center",
  },

  circleText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },

  title: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  highlight: {
    color: "#3B82F6",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#475569",
  },
});
