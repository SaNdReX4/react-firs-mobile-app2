import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setProduct(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2D5BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.headerContainer}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color="#2D5BFF" />
            </TouchableOpacity>
            <View style={styles.navIcons}>
              <Ionicons
                name="share-outline"
                size={24}
                color="#2D5BFF"
                style={{ marginRight: 15 }}
              />
              <Ionicons name="heart-outline" size={24} color="#2D5BFF" />
            </View>
          </View>

          {}
          <Image
            source={{ uri: product?.image }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {}
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>${product?.price}</Text>
          <Text style={styles.title}>{product?.title}</Text>

          <Text style={styles.colorLabel}>
            Category: <Text style={{ color: "#000" }}>{product?.category}</Text>
          </Text>

          {}
          <View style={styles.colorOptions}>
            {["#333", "#2D5BFF", "#9B1B30", "#C68E5F"].map((color, index) => (
              <View
                key={index}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderWidth: index === 1 ? 2 : 0,
                    borderColor: "#2D5BFF",
                  },
                ]}
              />
            ))}
          </View>

          {}
          <Text style={styles.description}>{product?.description}</Text>

          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Fast Shipping</Text>
            <Text style={styles.bullet}>• Official Warranty</Text>
          </View>
        </View>
      </ScrollView>

      {}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Ionicons
            name="wallet-outline"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buyNowText}>Buy now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="bag-handle-outline" size={24} color="#2D5BFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    backgroundColor: "#F8F8F8",
    height: 400,
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navIcons: { flexDirection: "row" },
  mainImage: { width: "100%", height: 300, marginTop: 20 },
  detailsContainer: {
    padding: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
  },
  price: { fontSize: 18, color: "#666", fontWeight: "500" },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  colorLabel: { fontSize: 16, color: "#999", marginBottom: 15 },
  colorOptions: { flexDirection: "row", marginBottom: 25 },
  colorCircle: { width: 35, height: 35, borderRadius: 17.5, marginRight: 15 },
  description: { fontSize: 15, color: "#666", lineHeight: 22 },
  bulletContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bullet: { fontSize: 14, color: "#333", fontWeight: "500" },
  bottomActions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    alignItems: "center",
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: "#2D5BFF",
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowText: { color: "white", fontSize: 18, fontWeight: "bold" },
  cartBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
});
