import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Status, CustomerInfo } from "./components";
import { FlatList } from "native-base";
import billApi from "../../api/billApi";

const BillDetail = ({ route, navigation }) => {
  const { billId } = route.params;
  console.log(billId);
  const [bill, setBill] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await billApi.getOne(billId);
      setBill(response);
    };
    fetchOrder();
  }, [billId]);

  const data = [
    { id: 1, name: "status" },
    { id: 2, name: "item" },
    { id: 3, name: "another-info" },
    { id: 4, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "status":
        return <Status billStatus={bill?.status} />;
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
