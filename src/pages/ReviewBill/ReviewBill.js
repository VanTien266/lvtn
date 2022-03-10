import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CustomerInfo, AnortherInfo, ItemList } from "./components";
import { FlatList } from "native-base";

const ReviewBill = ({ route, navigation }) => {
  const { orderId, listProductAdded } = route.params;
  // console.log("params", route.params);
  // console.log(orderId, listProductAdded);

  const data = [
    { id: 1, name: "item" },
    { id: 2, name: "customer-info" },
    { id: 3, name: "another-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "item":
        return <ItemList listProductAdded={listProductAdded} />;
      case "customer-info":
        return <CustomerInfo />;
      case "another-info":
        return <AnortherInfo />;
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

export default ReviewBill;

const styles = StyleSheet.create({});
