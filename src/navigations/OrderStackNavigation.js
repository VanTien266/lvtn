import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import BillDetail from "../pages/BillDetail/BillDetail";
import { Ionicons } from "@expo/vector-icons";

const OrderStack = createStackNavigator();

const OrderStackNavigation = () => {
  const [displaySearch, setDisplaySearch] = useState(false);
  let handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="order-list"
        component={OrderList}
        options={{
          title: "Danh sách đơn đặt hàng",
          headerRight: () => (
            <View style={styles.titleBar}>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="filter" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtnBar}>
                <Ionicons name="notifications" size={24} color="#000040" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtnBar}
                onPress={handleDisplaySearch}
              >
                <Ionicons name="search-sharp" size={24} color="#000040" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: { borderBottomWidth: 0 }
        }}
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

const styles = StyleSheet.create({
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
