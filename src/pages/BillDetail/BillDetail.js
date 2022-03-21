import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Status, CustomerInfo, AnortherInfo, ItemList } from "./components";
import { FlatList } from "native-base";
import billApi from "../../api/billApi";

const BillDetail = ({ route, navigation }) => {
  const { billId } = route.params;
  const [bill, setBill] = useState({});

  useEffect(() => {
    let mouted = true;
    const fetchOrder = async () => {
      if (mouted) {
        const response = await billApi.getOne(billId);
        setBill(response);
      }
    };
    fetchOrder();
    return () => {
      mouted = false;
    };
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
        return <CustomerInfo bill={bill} />;
      case "another-info":
        return <AnortherInfo bill={bill} />;
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
