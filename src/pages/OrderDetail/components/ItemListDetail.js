import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Item from "./Item";

const ItemListDetail = ({ navigation, route }) => {
  const { products } = route.params;
  return (
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
  );
};

export default ItemListDetail;

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
