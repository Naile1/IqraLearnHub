import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { fullName = "", email = "" } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Menu Buttons */}
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EF",
    paddingHorizontal: 20,
  },

  // Header
  headerBox: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#CFE2F3",
    padding: 16,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    color: "#6B7280",
    fontSize: 16,
  },

  // Profile Card
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },

  // Avatar Section
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#E3F0FF",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    fontSize: 36,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
    color: "#1A1A1A",
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Menu Buttons
  menuList: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: "#EEF4FF",
    padding: 16,
    borderRadius: 12,
  },
  menuText: {
    color: "#1A1A1A",
    fontWeight: "500",
    fontSize: 16,
  },

  // Logout Button
  logoutBtn: {
    backgroundColor: "#1E3A8A", // deep blue
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
  },
  logoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
