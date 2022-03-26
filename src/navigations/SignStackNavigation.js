import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Pages
import { SignInScreen, SignUpScreen, SplashScreen } from "../pages/SignScreen";
import BottomNavigation from "./BottomNavigation";
import ShipperNavigation from "./ShipperNavigation";

const SignStack = createStackNavigator();

export default function SignStackNavigation() {
  return (
    <SignStack.Navigator screenOptions={{ headerShown: false }}>
      <SignStack.Screen name="splashscreen" component={SplashScreen} />
      <SignStack.Screen name="signinscreen" component={SignInScreen} />
      <SignStack.Screen name="signupscreen" component={SignUpScreen} />
      <SignStack.Screen name="BottomNavigation" component={BottomNavigation} />
      <SignStack.Screen
        name="ShipperNavigation"
        component={ShipperNavigation}
      />
    </SignStack.Navigator>
  );
}
