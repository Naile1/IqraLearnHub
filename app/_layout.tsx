import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Onboarding */}
      <Stack.Screen name="(onboarding)" />

      {/* Main Tabs */}
      <Stack.Screen name="(tabs)" />

      {/* Feature Screens */}
      <Stack.Screen name="ask-iqra/chat" />
      <Stack.Screen name="islamic/quran-details" />
      <Stack.Screen name="islamic/akhlaq-coach" />
      <Stack.Screen name="steam/lesson" />

      {/* Parent dashboard (no login) */}
      <Stack.Screen name="parent/dashboard" />

      {/* Settings */}
      <Stack.Screen name="settings/age-control" />
    </Stack>
  );
}
