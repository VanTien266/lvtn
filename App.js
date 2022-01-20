import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "native-base";
import DashBoard from "./src/pages/DashBoardPage/DashBoard";
import { BottomNavigation } from "./src/navigations/BottomNavigation";

export default function App() {
  return (
    // <NavigationContainer>
    //   <StatusBar backgroundColor="#00004080" />
    //   <Tab.Navigator
    //     initialRouteName="order"
    //     barStyle={{ backgroundColor: "#fff" }}
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         size = focused ? 25 : 20;
    //         color = focused ? "#000040" : "#00004050";
    //         let iconName;
    //         switch (route.name) {
    //           case "dashboard":
    //             iconName = "store";
    //             break;
    //           case "warehouse":
    //             iconName = "local-parking";
    //             break;
    //           case "order":
    //             iconName = "local-mall";
    //             break;
    //           case "support":
    //             iconName = "add-ic-call";
    //             break;
    //           default:
    //             iconName = "person";
    //             break;
    //         }
    //         return <Icon name={iconName} color={color} size={size} />;
    //       },
    //     })}
    //     tabBarOptions={{
    //       inactiveColor: "#00004050",
    //       activeColor: "#000040",
    //     }}
    //   >
    //     <Tab.Screen
    //       name="dashboard"
    //       component={DashBoard}
    //       options={{ title: "Trang chủ" }}
    //     ></Tab.Screen>
    //     <Tab.Screen
    //       name="warehouse"
    //       component={WareHouse}
    //       options={{ title: "Kho" }}
    //     ></Tab.Screen>
    //     <Tab.Screen
    //       name="order"
    //       component={Order}
    //       options={{ title: "Đơn hàng" }}
    //     ></Tab.Screen>
    //     <Tab.Screen
    //       name="support"
    //       component={Support}
    //       options={{ title: "Hỗ trợ" }}
    //     ></Tab.Screen>
    //     <Tab.Screen
    //       name="account"
    //       component={Account}
    //       options={{ title: "Tài khoản" }}
    //     ></Tab.Screen>
    //   </Tab.Navigator>
    // </NavigationContainer>
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="light" />
          <View>
            <DashBoard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // <SafeAreaView>
    //   <StatusBar backgroundColor="#00004080" />
    //   <BottomNavigation />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
