import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    alert: true,
    badge: true,
    sound: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
};

async function GetFCMToken() {
  console.log('testfcm');
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  console.log('old token', fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new fcmtoken generated', fcmtoken);
        AsyncStorage.setItem("fcmtoken", fcmtoken);
      }
    }
    catch (e) {
      console.log("error in fcmtoken", e);
    }
  };
};

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground state', remoteMessage);
  });
};

export const initPushNotification = (onNotification = () => { }) => {
  PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: (token) => {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: (notification) => {
      console.log("NOTIFICATION:", notification);

      //process the notification
      onNotification(notification);
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: (notification) => {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: (err) => {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },


    // Android only: GCM or FCM Sender ID
    senderID: '594227394434',

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    onNotification(remoteMessage, 'background');
  });

  PushNotification.createChannel(
    {
      channelId: "default-channel-id", // (required)
      channelName: "Default channel", // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      playSound: true,
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

};

/**
   * Check if your app has been granted permission to display notifications.
   */
export const checkAndAskPermission = (callback = () => { }) => {
  messaging()
    .hasPermission()
    .then(res => {
      console.log('permission fcm', res);
      if (res) {
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch(err => {
      console.log('permission fcm', err);
      callback(false);
    });
};

export const onMessage = (callback = () => { }) => {
  messaging().onMessage(remoteMessage => {
    console.log('fcm test', remoteMessage);
    callback(remoteMessage);
  });
};

export const setBadgeIos = (number) => {
  try {
    PushNotificationIOS.setApplicationIconBadgeNumber(Number(number));
  }
  catch (error) { }
};

export const subscribeTopic = topic => {
  return messaging().subscribeToTopic(topic);
}

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
}


