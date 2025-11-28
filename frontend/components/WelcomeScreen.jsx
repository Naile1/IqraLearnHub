import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      

      {/* Big Top Gradient Circle */}
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        style={styles.topCircle}
      />

      {/* Soft Wave Layer 1 */}
      <View style={styles.wave1} />

      {/* Soft Wave Layer 2 */}
      <View style={styles.wave2} />

      {/* Soft Curve */}
      <View style={styles.curve} />

      {/* Decorative Floating Dot */}
      <View style={styles.dotSmall} />

      {/* Decorative Diamond */}
      <View style={styles.diamond} />

      {/* ===== CENTER CONTENT ===== */}
      <View style={styles.center}>
        <Pressable
          onPress={() => router.push("/log-in")}
          style={styles.circleWrapper}
        >
          <LinearGradient
            colors={["#1E3A8A", "#3B82F6"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.circle}
          >
            <Text style={styles.circleText}>IQ</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.title}>
          Iqra<Text style={styles.highlight}>Learn</Text>Hub
        </Text>
        <Text style={styles.subtitle}>Learn • Grow • Excel</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  /* Background color */
  container: {
    flex: 1,
    backgroundColor: "#CFE2F3", // <<< UPDATED
    alignItems: "center",
    justifyContent: "center",
  },

  /* CENTER CONTENT */
  center: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height * 0.5 - 150,
    width: "100%",
  },

  /* ===== BACKGROUND DECORATIONS ===== */

  // Large Top Gradient Circle
  topCircle: {
    position: "absolute",
    top: -height * 0.35,
    width: width * 1.8,
    height: width * 1.8,
    borderRadius: width * 0.9,
  },

  // Wave 1
  wave1: {
    position: "absolute",
    top: height * 0.35,
    width: width * 2,
    height: height * 0.5,
    backgroundColor: "#CFE2F3",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    transform: [{ rotate: "-8deg" }],
  },

  // Wave 2 (darker)
  wave2: {
    position: "absolute",
    top: height * 0.42,
    width: width * 2.2,
    height: height * 0.55,
    backgroundColor: "#BBD7F2",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    transform: [{ rotate: "-12deg" }],
  },

  // Soft curve behind center
  curve: {
    position: "absolute",
    top: height * 0.28,
    width: width * 1.6,
    height: width * 1.2,
    backgroundColor: "#A8C9E8",
    opacity:0.35 ,
    borderRadius: width,
    transform: [{ rotate: "12deg" }],
  },

  // Floating small circle
  dotSmall: {
    position: "absolute",
    top: height * 0.30,
    right: width * 0.18,
    width: 18,
    height: 18,
    backgroundColor: "#2563EB",
    opacity: 0.8,
    borderRadius: 9,
  },

  // Floating diamond
  diamond: {
    position: "absolute",
    top: height * 0.40,
    left: width * 0.14,
    width: 26,
    height: 26,
    backgroundColor: "#1E3A8A",
    opacity: 0.8,
    transform: [{ rotate: "45deg" }],
    borderRadius: 6,
  },

  /* ===== CIRCLE ICON ===== */
  circleWrapper: {
    marginBottom: 30,
  },

  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  circleText: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#1E3A8A",
    textAlign: "center",
  },

  highlight: {
    color: "#3B82F6",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#475569",
    textAlign: "center",
  },
});
