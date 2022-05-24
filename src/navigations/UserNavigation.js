import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Product from "../pages/user/Product/CreateOrder"; //check CreateOrder or Product
import Order from "../pages/Order/Order";
import Support from "../pages/Support/Support";
import Account from "../pages/Account/Account";

const Tab = createMaterialBottomTabNavigator();

const UserNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="product"
      barStyle={{ backgroundColor: "#fff" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          size = focused ? 25 : 20;
          color = focused ? "#000040" : "#00004050";
          let iconName;
          switch (route.name) {
            case "product":
              iconName = "local-parking";
              break;
            case "user-order":
              iconName = "local-mall";
              break;
            case "support":
              iconName = "add-call";
              break;
            default:
              iconName = "person";
              break;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        inactiveColor: "#00004050",
        activeColor: "#000040",
      }}
    >
      <Tab.Screen
        name="product"
        component={Product}
        options={{ title: "Sản phẩm" }}
      ></Tab.Screen>
      <Tab.Screen
        name="user-order"
        component={Order}
        options={{
          title: "Đơn hàng",
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="support"
        component={Support}
        options={{ title: "Hỗ trợ" }}
      ></Tab.Screen>
      <Tab.Screen
        name="account"
        component={Account}
        options={{ title: "Tài khoản" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserNavigation;

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
