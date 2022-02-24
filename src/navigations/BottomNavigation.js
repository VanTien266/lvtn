import React from "react";
import { StyleSheet } from "react-native";
import DashBoard from "../pages/DashBoardPage/DashBoard";
import Order from "../pages/Order/Order";
import WareHouse from "../pages/WareHouse/WareHouse";
import Support from "../pages/Support/Support";
import Account from "../pages/Account/Account";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
      <Tab.Navigator
        initialRouteName="dashboard"
        barStyle={{ backgroundColor: "#fff" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            size = focused ? 25 : 20;
            color = focused ? "#000040" : "#00004050";
            let iconName;
            switch (route.name) {
              case "dashboard":
                iconName = "store";
                break;
              case "warehouse":
                iconName = "local-parking";
                break;
              case "order":
                iconName = "local-mall";
                break;
              case "support":
                iconName = "add-ic-call";
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
          name="dashboard"
          component={DashBoard}
          options={{ title: "Trang chủ" }}
        ></Tab.Screen>
        <Tab.Screen
          name="warehouse"
          component={WareHouse}
          options={{ title: "Kho" }}
        ></Tab.Screen>
        <Tab.Screen
          name="order"
          component={Order}
          options={{ title: "Đơn hàng" }}
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

export default BottomNavigation;

// const styles = StyleSheet.create({});
