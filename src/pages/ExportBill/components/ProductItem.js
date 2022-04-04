import React from "react";
import { StyleSheet, Text, View } from "react-native";
import validateProduct from "../../../utils/validateProduct";
import { formattedValue } from "../../../utils/formatNumber";

const CHILD_ROW_HEIGHT = 20;

const ProductItem = (props) => {
  const { item, index, listAddedItem } = props;

  let lengthAdded = 0;
  if (listAddedItem.length > 0)
    listAddedItem.forEach((item) => (lengthAdded += item.length));
  const isDone = validateProduct(item.length, item.shippedLength + lengthAdded);
  return (
    <View
      style={[
        styles.childRow,
        index % 2 === 0 && styles.item,
        lengthAdded > 0 && styles.added,
        isDone && styles.done,
      ]}
    >
      <Text style={styles.childCell}>{index || ""}</Text>
      <Text style={styles.childCell}>{item.colorCode.colorCode}</Text>
      <Text style={{ flex: 2, fontSize: 10 }}>{item.colorCode.name || ""}</Text>
      <Text style={styles.childCell}>
        {formattedValue(item.shippedLength + lengthAdded)}
      </Text>
      <Text style={styles.childCell}>
        {formattedValue(item.length - item.shippedLength - lengthAdded)}
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
  done: { backgroundColor: "#5A9E4B" },
  added: { backgroundColor: "#747FFF" },
});
