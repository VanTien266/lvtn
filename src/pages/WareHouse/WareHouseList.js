import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function WareHouseList({ navigation }) {
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("warehouse-detail")}
        >
          <Text style={styles.warehouseText}>Kho 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("warehouse-detail")}
        >
          <Text style={styles.warehouseText}>Kho 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("warehouse-detail")}
        >
          <Text style={styles.warehouseText}>Kho 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("warehouse-detail")}
        >
          <Text style={styles.warehouseText}>Kho 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("warehouse-detail")}
        >
          <Text style={styles.warehouseText}>Kho 5</Text>
        </TouchableOpacity>
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
    backgroundColor: "#747FFF",
    alignItems: "center",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    minHeight: 80,
    textAlign: "center",
    flexDirection: "row",
  },
  warehouseText: {
    fontSize: 18,
    color: "white",
    flex: 1,
    alignItems: "center",
  },
});
