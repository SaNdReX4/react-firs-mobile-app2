import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* მთავარი თაბები (პროდუქტები აქ არის) */}
      <Stack.Screen name="(tabs)" />
      {/* ავტორიზაციის ჯგუფი */}
      <Stack.Screen name="(auth)" options={{ presentation: "modal" }} />
      {/* პროდუქტების დეტალები */}
      <Stack.Screen name="products/[id]" />
    </Stack>
  );
}
