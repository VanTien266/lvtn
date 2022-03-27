import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Item from "./Item";

const ItemList = (props) => {
  const { products } = props;

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Sản phẩm</Card.Title>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerCell}>STT</Text>
          <Text style={styles.headerCell}>Mã</Text>
          <Text style={{ flex: 2 }}>Tên sản phẩm</Text>
          <Text style={styles.headerCell}>Đã giao</Text>
          <Text style={styles.headerCell}>Còn lại</Text>
        </View>
        {products && (
          <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <Item item={item} index={index + 1} />
            )}
            keyExtractor={(item, index) => item.colorCode.colorCode}
          />
        )}
      </View>
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#B4B4C1",
    paddingHorizontal: 5,
  },
  headerCell: { flex: 1, color: "#000040" },
});
