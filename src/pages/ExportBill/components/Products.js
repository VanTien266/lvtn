import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Card } from "react-native-elements";
import ProductItem from "./ProductItem";

const Products = (props) => {
  const { product } = props;
  console.log(product);

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
        {product && (
          <FlatList
            data={product}
            renderItem={({ item, index }) => (
              <ProductItem item={item} index={index + 1} />
            )}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    </Card>
  );
};

export default Products;

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
