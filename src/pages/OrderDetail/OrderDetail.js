import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { CustomerInfo, ItemList, Status } from "./components";

const OrderDetail = () => {
  const data = [
    { id: 1, name: "status" },
    { id: 2, name: "item" },
    { id: 3, name: "order-list" },
    { id: 4, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "status":
        return <Status />;
      case "item":
        return <ItemList />;
      case "customer-info":
        return <CustomerInfo />;
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({ container: { flex: 1 } });
