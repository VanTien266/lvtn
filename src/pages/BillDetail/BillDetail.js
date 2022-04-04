import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, RefreshControl } from "react-native";
import { Status, CustomerInfo, AnortherInfo, ItemList } from "./components";
import { FlatList } from "native-base";
import billApi from "../../api/billApi";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BillDetail = ({ route, navigation }) => {
  const { billId } = route.params;
  const [bill, setBill] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

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
  }, [billId, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default BillDetail;

const styles = StyleSheet.create({});
