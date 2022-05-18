import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateOrder from "../pages/user/Product/CreateOrder";
import ReviewOrder from "../pages/user/Product/ReviewOrder";

const UserProductStack = createStackNavigator();

const UserProductNavigation = () => {
  return (
    <UserProductStack.Navigator>
      <UserProductStack.Screen
        name="create-order"
        component={CreateOrder}
        options={({ navigation }) => ({
          title: "Tạo đơn đặt hàng",
          headerLeft: () => null,
        })}
      />
      <UserProductStack.Screen
        name="review-order"
        component={ReviewOrder}
        options={({ navigation, route }) => ({
          title: "Xem lại đơn đặt hàng",
        })}
      />
    </UserProductStack.Navigator>
  );
};

export default UserProductNavigation;
