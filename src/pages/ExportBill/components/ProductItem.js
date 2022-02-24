import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CHILD_ROW_HEIGHT = 20;

const ProductItem = (props) => {
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
};

export default ProductItem;

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