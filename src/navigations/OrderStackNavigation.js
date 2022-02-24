import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, Box } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import BillDetail from "../pages/BillDetail/BillDetail";
import { Ionicons } from "@expo/vector-icons";
import OrderSearch from "../pages/Order/OrderSearch";
import OrderFilter from "../pages/Order/OrderFilter";
import ExportBill from "../pages/ExportBill/ExportBill";

const OrderStack = createStackNavigator();

const OrderStackNavigation = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="order-list"
        component={OrderList}
        options={({ navigation }) => ({
          title: "Danh sách đơn đặt hàng",
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={() => navigation.push("order-filter")}
              >
                <Ionicons name="filter" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={() => navigation.push("order-search")}
              >
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: { borderBottomWidth: 0 },
        })}
      />
      <OrderStack.Screen
        name="order-detail"
        component={OrderDetail}
        options={({ navigation, route }) => ({
          title: "Chi tiết đơn đặt hàng",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              onPress={() => {
                navigation.push("export-bill", route.params);
              }}
              leftIcon={<Icon name="file-upload" size={20} color="#00004060" />}
            >
              Xuất HĐ
            </Button>
          ),
        })}
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
      <OrderStack.Screen
        name="export-bill"
        component={ExportBill}
        options={{
          title: "Xuất hóa đơn",
          headerRight: () => (
            <Button
              variant={"ghost"}
              colorScheme="light"
              onPress={() => {
                console.log("Pushed");
                // navigation.push("export-bill");
              }}
              leftIcon={<Icon name="file-upload" size={20} color="#000040" />}
            >
              Tạo HĐ
            </Button>
          ),
        }}
      />
      <OrderStack.Screen
        name="order-search"
        component={OrderSearch}
        options={{
          title: "Tìm kiếm đơn đặt hàng",
        }}
      />
      <OrderStack.Screen
        name="order-filter"
        component={OrderFilter}
        options={{
          title: "Lọc đơn đặt hàng",
        }}
      />
      <OrderStack.Screen
        name="bill-search"
        component={BillDetail}
        options={{
          title: "Tìm kiếm hóa đơn",
        }}
      />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigation;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  verticalCenter: {
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  orderItem: {
    backgroundColor: "#F6F6F8",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    minHeight: 40,
  },
  orderItemText: {
    fontFamily: "'Roboto', sans-serif",
    color: "#000040",
    fontSize: 12,
  },

  titleBar: {
    flex: 1,
    flexDirection: "row",
  },
  iconBtnBar: {
    marginLeft: 5,
    marginRight: 5,
    direction: "inherit",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
