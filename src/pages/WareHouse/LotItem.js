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
            <View style={styles.lotInfo}>
              <Text>{item._id}</Text>
            </View>
            <View style={styles.lotInfo}>
              <Text>{item.itemName.name}</Text>
            </View>
            <View style={styles.lotInfo}>
              <Text>{item.count}</Text>
            </View>
            <TouchableOpacity>
              <Feather name="chevron-right" size={15} />
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
  },
  lotInfo: {
    flex: 1,
  },
});
