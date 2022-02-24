import { StyleSheet, FlatList, View } from "react-native";
import orderApi from "../../api/orderApi";
import React, { useState, useEffect } from "react";
import { AnortherInfo, CustomerInfo, Products } from "./components";

const ExportBill = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchOrderDetail = async () => {
      const response = await orderApi.getOne(orderId);
      if (mounted) {
        setOrder(response);
      }
    };
    fetchOrderDetail();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  const data = [
    { id: 1, name: "product" },
    { id: 2, name: "customer-info" },
    { id: 3, name: "another-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "product":
        return <Products product={order?.products} />;
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

export default ExportBill;

const styles = StyleSheet.create({ container: { flex: 1 } });
