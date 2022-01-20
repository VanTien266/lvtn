import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import BillDetail from "../pages/BillDetail/BillDetail";

const OrderStack = createStackNavigator();

const OrderStackNavigation = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="order-list"
        component={OrderList}
        options={{ title: "Danh sách đơn đặt hàng" }}
      />
      <OrderStack.Screen
        name="order-detail"
        component={OrderDetail}
        options={{ title: "Chi tiết đơn đặt hàng" }}
      />
      <OrderStack.Screen
        name="bill-detail"
        component={BillDetail}
        options={{ title: "Chi tiết hóa đơn bán hàng" }}
      />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigation;

const styles = StyleSheet.create({});
