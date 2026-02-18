import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// პროდუქტის ტიპის განსაზღვრა TypeScript-ისთვის
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={{ color: "#7B61FF" }}>⇄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={{ color: "red" }}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.price}>{item.price} ₾</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={{ fontSize: 18 }}>🛒</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            router.push({
              pathname: "/products/[id]",
              params: { id: item.id },
            });
          }}
        >
          <Text style={styles.buyButtonText}>ნახვა</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7B61FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listPadding: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    alignItems: "center",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topButtons: {
    position: "absolute",
    right: 0,
    top: 0,
    gap: 10,
  },
  iconCircle: {
    backgroundColor: "#fff",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 15,
    lineHeight: 24,
  },
  price: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buyButton: {
    backgroundColor: "#7B61FF",
    paddingVertical: 12,
    borderRadius: 30,
    flex: 1,
    marginLeft: 15,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
