import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "../Utill/fetchHook";

export default function Home({ navigation }) {
  const data = useFetch("https://fakestoreapi.com/products");
  const [homedata, sethomedata] = useState(null);
  const [estado, setEstado] = useState(false);
  const [color, setColor] = useState("green");
  const agregarFavoritos = () => {
    setEstado(!estado);
  };

  const submit = () => {
    //return Alert.alert(first,last);

    navigation.navigate("Bookmark");
  };

  const getlocaldataFromUserDevice = async () => {
    try {
      const datalocal = await AsyncStorage.getItem("data");
      if (datalocal != null) {
        sethomedata(JSON.parse(datalocal));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getlocaldataFromUserDevice();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity>
        <Ionicons
          name={estado ? "heart-outline" : "heart-sharp"}
          size={20}
          color="#ff6347"
          onPress={() => setEstado(estado ? "heart-outline" : "heart-sharp")}
          //   on
          //   Click={() => setColor("red", "orange")}
        />
      </TouchableOpacity>
      <Image
        style={{ width: "100%", height: 180 }}
        source={{
          uri: item.image,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "green" }}> {item.title}</Text>
        <Text style={{ color: "blue", fontWeight: "bold" }}>{item.price}</Text>
        <TouchableOpacity>
          <Text style={{ color: "blue", fontWeight: "bold" }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 32 }}>Shop Now</Text>
      <FlatList
        numColumns={2}
        data={homedata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View>
        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <Text>Bookmark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF5F5",
  },
  card: {
    padding: 12,
    paddingBottom: 18,
    borderRadius: 24,
    backgroundColor: "white",
    width: "45%",
    margin: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    marginTop: 32,
  },
});
