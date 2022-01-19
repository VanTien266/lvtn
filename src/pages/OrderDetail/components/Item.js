import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ITEM_HEIGHT = 25;
const CHILD_ROW_HEIGHT = 20;

const Item = (props) => {
  const { item } = props;
  const [expanded, setExpanded] = useState(false);

  const ChildRow = ({ item, index }) => (
    <View style={styles.childRow}>
      <Text style={styles.childCell}>{index + 1}</Text>
      <Text style={styles.childCell}>{item.type}</Text>
      <Text style={{ flex: 1.5, fontSize: 10 }}>{item.name}</Text>
      <Text style={styles.childCell}>{item.length}</Text>
      <Text style={styles.childCell}>{item.price}</Text>
    </View>
  );
  return (
    <View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.item}
      >
        <Text style={styles.cell}>
          {item.fabricName} ({item.fabricType})
        </Text>
        <Icon
          name={expanded ? "expand-less" : "expand-more"}
          color="#000040"
          size={20}
        />
      </TouchableOpacity>
      {expanded && (
        <FlatList
          data={item.item}
          renderItem={ChildRow}
          keyExtractor={(item) => item.type}
        />
      )}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B4B4C1",
    paddingHorizontal: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  cell: { fontSize: 12, fontWeight: "bold", flex: 1 },
  childRow: {
    height: CHILD_ROW_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  childCell: { fontSize: 10, flex: 1 },
});
