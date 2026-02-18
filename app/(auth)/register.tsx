import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("არასწორი მეილი").required("მეილი აუცილებელია"),
  password: yup
    .string()
    .min(6, "მინიმუმ 6 სიმბოლო")
    .required("პაროლი აუცილებელია"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("პაროლის დადასტურება აუცილებელია"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("მონაცემები:", data);
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* ლოგოს კონტეინერი */}
        <View style={styles.logoContainer}>
          <View style={styles.blueCircle}>
            <View style={styles.userHead} />
            <View style={styles.userBody} />
          </View>

          <View style={styles.plusBadge}>
            <Text style={styles.plusText}>+</Text>
          </View>
        </View>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="email or username"
              placeholderTextColor="#A0A0A0"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="password again"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)")}>
          <Text style={styles.linkText}>sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center", // ყველაფერს აცენტრებს ვერტიკალურად
    padding: 25,
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: "center",
    position: "relative",
  },
  blueCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4a90e2",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  userHead: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "white",
    marginBottom: 8,
  },
  userBody: {
    width: 80,
    height: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  plusBadge: {
    position: "absolute",
    bottom: -1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4a90e2",
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  plusText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -2,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#f2f2f2",
    borderRadius: 28,
    paddingHorizontal: 25,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#4a90e2",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
  linkText: { color: "#4a90e2", marginTop: 20, fontSize: 16 },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
  },
});
