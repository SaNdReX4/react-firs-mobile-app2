import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#7B61FF" />
        <Text style={styles.title}>ჩემი პროფილი</Text>
      </View>

      <View style={styles.linkContainer}>
        {/* გადასვლა ლოგინზე */}
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push("/(auth)")}
        >
          <View style={styles.iconLabel}>
            <Ionicons name="log-in-outline" size={24} color="#333" />
            <Text style={styles.linkText}>სისტემაში შესვლა</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        {/* გადასვლა რეგისტრაციაზე */}
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push("/(auth)/register")}
        >
          <View style={styles.iconLabel}>
            <Ionicons name="person-add-outline" size={24} color="#333" />
            <Text style={styles.linkText}>რეგისტრაცია</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  linkContainer: { paddingHorizontal: 20 },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconLabel: { flexDirection: "row", alignItems: "center" },
  linkText: { fontSize: 16, marginLeft: 15, color: "#333" },
});
