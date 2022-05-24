import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WareHouseList({ navigation }) {
  const lstWarehouse = [
    { name: "Kho 1", id: "K1" },
    { name: "Kho 2", id: "K2" },
    { name: "Kho 3", id: "K3" },
    { name: "Kho 4", id: "K4" },
    { name: "Kho 5", id: "K5" },
    { name: "Kho 6", id: "K6" },
    { name: "Kho 7", id: "K7" },
  ]

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={styles.row}>
        {lstWarehouse.map((item, idx) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("warehouse-detail", { warehouseId: item.id})}
          >
            <View style={styles.contentBox}>
              <FontAwesome5 name="warehouse" size={18} color="#000040" />
              <Text style={styles.warehouseText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wareHouseEle: {
    borderRadius: 10,
    borderWidth: 1,
    minWidth: "50%",
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: "#000040",
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    minHeight: 70,
    textAlign: "center",
    flexDirection: "row",
  },
  warehouseText: {
    fontSize: 18,
    color: "#000040",
    fontWeight: "500"
  },
  contentBox: {
    flex: 1,
    alignItems: "center"
  }
});
