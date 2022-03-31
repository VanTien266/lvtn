import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CheckStatus, CustomerInfo } from "./components";
import { FlatList } from "native-base";

const BillDetail = ({ route, navigation }) => {
  const { bill } = route.params;

  const data = [
    { id: 1, name: "check-status" },
    { id: 2, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "check-status":
        return <CheckStatus billStatus={bill?.status} />;
      case "customer-info":
        return <CustomerInfo bill={bill} />;
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
