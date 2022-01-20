import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BillDetail from "../BillDetail/BillDetail";
import OrderDetail from "../OrderDetail/OrderDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Order = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="order-detail"
        component={OrderDetail}
        options={{ title: "Chi tiết đơn đặt hàng" }}
      />
      <Stack.Screen
        name="bill-detail"
        component={BillDetail}
        options={{ title: "Chi tiết hóa đơn" }}
      />
    </Stack.Navigator>
  );
  // return <OrderDetail />;
};

export default Order;

const styles = StyleSheet.create({});
