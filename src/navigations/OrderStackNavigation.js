import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
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
        options={{
          title: "Chi tiết đơn đặt hàng",
          headerRight: () => (
            <Button
              variant={"ghost"}
              leftIcon={<Icon name="file-upload" size={14} />}
            >
              Xuất hóa đơn
            </Button>
          ),
        }}
      />
      <OrderStack.Screen
        name="bill-detail"
        component={BillDetail}
        options={{
          title: "Hóa đơn bán hàng",
          headerRight: () => (
            <Button
              variant={"ghost"}
              leftIcon={<Icon name="local-printshop" size={14} />}
            >
              In hóa đơn
            </Button>
          ),
        }}
      />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigation;

const styles = StyleSheet.create({});
