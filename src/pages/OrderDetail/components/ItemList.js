import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Item from "./Item";

const ItemList = (props) => {
  const { products } = props;
  const data = [
    {
      fabricType: "kk",
      fabricName: "kaki",
      item: [
        { type: "kk11", name: "kaki trắng", length: 100, price: 20000 },
        { type: "kk12", name: "kaki đen", length: 200, price: 20000 },
        { type: "kk13", name: "kaki xanh", length: 400, price: 20000 },
        { type: "kk14", name: "kaki đỏ", length: 500, price: 20000 },
        { type: "kk15", name: "kaki tím", length: 300, price: 20000 },
      ],
    },
    {
      fabricType: "je",
      fabricName: "jean",
      item: [{ type: "je11", name: "jean trắng", length: 500, price: 12000 }],
    },
    {
      fabricType: "kt",
      fabricName: "kate",
      item: [
        { type: "kt11", name: "kate trắng", length: 100, price: 20000 },
        { type: "kt12", name: "kate đen", length: 200, price: 20000 },
        { type: "kt13", name: "kate xanh", length: 400, price: 20000 },
        { type: "kt14", name: "kate đỏ", length: 500, price: 20000 },
      ],
    },
    {
      fabricType: "co",
      fabricName: "coton",
      item: [
        { type: "co11", name: "coton trắng", length: 100, price: 20000 },
        { type: "co14", name: "coton đỏ", length: 500, price: 20000 },
        { type: "co15", name: "coton tím", length: 300, price: 20000 },
      ],
    },
  ];

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
            keyExtractor={(item, index) => index}
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
