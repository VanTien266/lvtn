import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Pages
import { SignInScreen, SignUpScreen, SplashScreen } from "../pages/SignScreen";
import BottomNavigation from "./BottomNavigation";
import ShipperNavigation from "./ShipperNavigation";
import UserNavigation from "./UserNavigation";

const SignStack = createStackNavigator();

export default function SignStackNavigation() {
  const getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem("user"));
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log("Can not reading data from AsyncStorage!");
    }
  };

  const GenerateInitRoute = async (session) => {
    if (session.jwt) {
      switch (session.role) {
        case "SALESMAN":
          return "BottomNavigation";
        case "ADMIN":
          return;
        default:
          return "Usernavigation";
      }
    } else return "splashscreen";
  };
  return (
    <SignStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={GenerateInitRoute(getData())}
    >
      <SignStack.Screen name="splashscreen" component={SplashScreen} />
      <SignStack.Screen name="signinscreen" component={SignInScreen} />
      <SignStack.Screen name="signupscreen" component={SignUpScreen} />
      <SignStack.Screen name="BottomNavigation" component={BottomNavigation} />
      <SignStack.Screen name="UserNavigation" component={UserNavigation} />
      <SignStack.Screen
        name="ShipperNavigation"
        component={ShipperNavigation}
      />
    </SignStack.Navigator>
  );
}
