import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { BottomNavigation } from "./src/navigations";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SignStackNavigation from "./src/navigations/SignStackNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission, NotificationListener} from './src/utils/FCMService';
import notifee, {AndroidImportance} from '@notifee/react-native';

import store from "./src/redux/store";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('Bạn nhận được thông báo từ BKFabric', JSON.stringify(remoteMessage.notification.body));
      DisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
      },
    });
  }
  
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
