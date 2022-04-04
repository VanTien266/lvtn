import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import History from "../pages/Shipper/History/History";
import Account from "../pages/Account/Account";
import Bill from "../pages/Shipper/BillList/Bill";

const Tab = createMaterialBottomTabNavigator();

const ShipperNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="order-list"
      barStyle={{ backgroundColor: "#fff" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          size = focused ? 25 : 20;
          color = focused ? "#000040" : "#00004050";
          let iconName;
          switch (route.name) {
            case "order-list":
              iconName = "local-mall";
              break;
            case "history":
              iconName = "restore";
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
        name="order-list"
        component={Bill}
        options={{ title: "Hóa đơn" }}
      ></Tab.Screen>
      <Tab.Screen
        name="history"
        component={History}
        options={{
          title: "Lịch sử",
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="account"
        component={Account}
        options={{ title: "Tài khoản" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default ShipperNavigation;

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
