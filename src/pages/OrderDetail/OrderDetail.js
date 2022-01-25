import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { CustomerInfo, ItemList, ListBill, Status } from "./components";
import orderApi from "../../api/orderApi";

const OrderDetail = ({ route, navigation }) => {
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
    { id: 1, name: "status" },
    { id: 2, name: "item" },
    { id: 3, name: "list-bill" },
    { id: 4, name: "customer-info" },
  ];
  const renderItem = ({ item }) => {
    switch (item.name) {
      case "status":
        return <Status orderStatus={order?.orderStatus} />;
      case "item":
        return <ItemList products={order?.products} />;
      case "list-bill":
        return (
          <ListBill navigation={navigation} detailBill={order?.detailBill} />
        );
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
    // <ScrollView>
    //   <Status orderStatus={order.orderStatus} />
    //   {/* <ItemList />
    //   <ListBill navigation={navigation} />
    //   <CustomerInfo /> */}
    // </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({ container: { flex: 1 } });
