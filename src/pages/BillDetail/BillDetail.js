import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Status, CustomerInfo } from "./components";
import { FlatList } from "native-base";

const BillDetail = () => {
  const data = [
    { id: 1, name: "status" },
    { id: 2, name: "item" },
    { id: 3, name: "another-info" },
    { id: 4, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "status":
        return <Status />;
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

export default BillDetail;

const styles = StyleSheet.create({});
