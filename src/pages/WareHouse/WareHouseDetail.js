import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon, useStyledSystemPropsResolver } from "native-base";
import productApi from "../../api/productApi";
// import { RollOutLeft } from "react-native-reanimated";
import LotItem from "./LotItem";

export default function WareHouseDetail({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [listFabricType, setListFabricType] = useState([]);
  useEffect(() => {
    const fetchListFabricType = async () => {
      try {
        const response = await productApi.getAll();
        setListFabricType(response);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
    };
    fetchListFabricType();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerList}>
        <View style={[styles.headerTitle, { borderRightWidth: 1, flex: 3 }]}>
          <Text style={styles.titleText}>Lô vải</Text>
        </View>
        <View style={[styles.headerTitle, { borderRightWidth: 1, flex: 5 }]}>
          <Text style={styles.titleText}>Màu vải</Text>
        </View>
        <View style={[styles.headerTitle, { flex: 4 }]}>
          <Text style={styles.titleText}>Tồn kho</Text>
        </View>
      </View>
      {listFabricType.length !== 0 && isLoading === false ? (
        <FlatList
          data={listFabricType}
          nestedScrollEnabled
          renderItem={({ item, idx }) => {
            return (
              <View>
                <View style={styles.fabricNameRow}>
                  <Text style={styles.fabricName}>{item.name}</Text>
                </View>
                <LotItem lotList={item.fabricRoll} />
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.loadState}>
          <ActivityIndicator />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  headerList: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    minHeight: 30,
    borderColor: "#B4B4C1",
  },
  headerTitle: {
    paddingLeft: 10,
    borderColor: "#B4B4C1",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000040",
  },
  fabricNameRow: {
    minHeight: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#B4B4C1",
    backgroundColor: "#B4B4C1",
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  fabricName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000040",
  },
  loadState: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
  },
});
