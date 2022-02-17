import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "native-base";
import productApi from "../../api/productApi";
import { RollOutLeft } from "react-native-reanimated";
import LotItem from "./LotItem";

export default function WareHouseDetail({ navigation }) {
  const [listFabricType, setListFabricType] = useState([]);
  useEffect(() => {
    const fetchListFabricType = async () => {
      try {
        const response = await productApi.getAll();
        console.log(response);
        setListFabricType(response);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
    };
    fetchListFabricType();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerList}>
        <View style={[styles.headerTitle, { borderRightWidth: 1 }]}>
          <Text>Lô vải</Text>
        </View>
        <View style={[styles.headerTitle, { borderRightWidth: 1 }]}>
          <Text>Màu vải</Text>
        </View>
        <View style={styles.headerTitle}>
          <Text>Tồn kho</Text>
        </View>
      </View>
      {listFabricType.length !== 0 && (
        <FlatList
          data={listFabricType}
          renderItem={({ item, idx }) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <LotItem lotList={item.fabricRoll} />
              </View>
            );
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  headerList: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    minHeight: 30,
    borderColor: "#B4B4C1",
  },
  headerTitle: {
    flex: 1,
    paddingLeft: 10,
    borderColor: "#B4B4C1",
    flexDirection: "row",
    alignItems: "center",
  },
});
