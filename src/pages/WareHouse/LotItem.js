import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function LotItem(props) {
  const { lotList } = props;
  return (
    <View>
      <FlatList
        data={lotList}
        renderItem={({ item, idx }) => (
          <View style={styles.lotRow}>
            <View style={[styles.lotInfo, {flex: 3}]}>
              <Text style={styles.lotInfoTxt}>{item._id}</Text>
            </View>
            <View style={[styles.lotInfo, {flex: 5}]}>
              <Text style={styles.lotInfoTxt}>{item.itemName.name}</Text>
            </View>
            <View style={[styles.lotInfo, {flex: 3}]}>
              <Text style={styles.lotInfoTxt}>{item.count}</Text>
            </View>
            <TouchableOpacity style={[styles.extraBtn, {flex: 1}]}>
              <Feather name="chevron-right" size={15} color="#000040"/>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lotRow: {
    flex: 1,
    flexDirection: "row",
    minHeight: 30,
    borderBottomColor: "#B4B4C1",
    borderBottomWidth: 1
  },
  lotInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  lotInfoTxt: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000040"
  },
  extraBtn: {
    flexDirection: "row",
    alignItems: "center",
  }
});
