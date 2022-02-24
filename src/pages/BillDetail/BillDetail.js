import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Status, CustomerInfo, AnortherInfo, ItemList } from "./components";
import { FlatList } from "native-base";
import billApi from "../../api/billApi";

const BillDetail = ({ route, navigation }) => {
  const { billId } = route.params;
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
    { id: 3, name: "customer-info" },
    { id: 4, name: "another-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "status":
        return <Status billStatus={bill?.status} />;
      case "item":
        return <ItemList listFabricId={bill?.fabricRoll} />;
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

export default BillDetail;

const styles = StyleSheet.create({});
