import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* index არის Login გვერდი */}
      <Stack.Screen name="index" />

      {/* register გვერდი */}
      <Stack.Screen name="register" />
    </Stack>
  );
}
