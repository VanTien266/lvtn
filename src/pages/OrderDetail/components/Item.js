import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CHILD_ROW_HEIGHT = 20;

const Item = (props) => {
  const { item, index } = props;

  return (
    <View style={[styles.childRow, index % 2 === 0 && styles.item]}>
      <Text style={styles.childCell}>{index || ""}</Text>
      <Text style={styles.childCell}>{item.colorCode.colorCode}</Text>
      <Text style={{ flex: 2, fontSize: 10 }}>{item.colorCode.name || ""}</Text>
      <Text style={styles.childCell}>{item.shippedLength} m</Text>
      <Text style={styles.childCell}>
        {item.length - item.shippedLength >= 0
          ? item.length - item.shippedLength
          : 0}
        {" m"}
      </Text>
    </View>
  );

  // const ChildRow = ({ item, index }) => (
  //   <View style={styles.childRow} key={index}>
  //     <Text style={styles.childCell}>{index + 1}</Text>
  //     <Text style={styles.childCell}>{item.type}</Text>
  //     <Text style={{ flex: 1.5, fontSize: 10 }}>{item.name}</Text>
  //     <Text style={styles.childCell}>{item.length}</Text>
  //     <Text style={styles.childCell}>{item.price}</Text>
  //   </View>
  // );
  // return (
  //   <View>
  //     <TouchableOpacity
  //       onPress={() => setExpanded(!expanded)}
  //       style={styles.item}
  //     >
  //       <Text style={styles.cell}>{item.colorCode.name}</Text>
  //       <Icon
  //         name={expanded ? "expand-less" : "expand-more"}
  //         color="#000040"
  //         size={20}
  //       />
  //     </TouchableOpacity>
  //     {expanded && (
  //       <FlatList
  //         data={item.item}
  //         renderItem={ChildRow}
  //         keyExtractor={(item) => item.type}
  //       />
  //     )}
  //   </View>
  // );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#F6F6F8",
  },
  childRow: {
    height: CHILD_ROW_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  childCell: { fontSize: 10, flex: 1, color: "#000040" },
});
