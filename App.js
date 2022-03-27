import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SignStackNavigation from "./src/navigations/SignStackNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./src/redux/store";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <StatusBar backgroundColor="#00004080" />
          <NavigationContainer>
            <SignStackNavigation />
          </NavigationContainer>
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight, //để hiển thị tốt trên Android
  },
});
