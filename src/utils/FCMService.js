import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native-web';


  export const initPushNotifications = (onNotification = () => { }) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
        onNotification(notification);
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

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

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      onNotification(remoteMessage, 'background');
    });

    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  export const checkAndAskPermission = (callback = () => { }) => {
    messaging()
      .hasPermission()
      .then(r => {
        console.log('permission fcm', r);
        if (r) {
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch(e => {
        console.log('permission fcm', e);
        callback(false);
      });
  };

  export const onMessage = (callback = () => { }) => {
    messaging().onMessage(remoteMessage => {
      console.log('nossss', remoteMessage);
      callback(remoteMessage);
    });
  };

  // export const getFcmToken = (callback = token => { }) => {
  //   console.log('chay get fcmtoken');
  //   try {
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         console.log({ token });
  //         if (token) {
  //           callback(token);
  //         }
  //       });
  //   } catch (error) {
  //     console.log('error>>', error);
  //   }
  // };
  export async function GetFCMToken() {
    
    let fcmtoken = AsyncStorage.getItem('fcmtoken');
    console.log('chay Get FCM Token', fcmtoken);
      try {
        let fcmtoken = await messaging().getToken();
        
        if (fcmtoken) {
          console.log('fcmtoken', fcmtoken);
          AsyncStorage.setItem('fcmtoken', fcmtoken);
        }
        else {

        }
      }
      catch (err) {
        console.log('error in fcm token', err);
      }
  };
  GetFCMToken();
  export function setBadgeIos(number) {
    try {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(number));
    } catch (error) { }
  }

  export const subscribeToTopic = topic => {
    return messaging().subscribeToTopic(topic);
  };

  export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  };

  export const deleteToken = () => {
    console.log('delete Token');
    messaging().deleteToken()
      .catch(err => {
        console.log('Delete Token error', err);
      })
  };
  export const NotificationListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      Alert.alert(
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
      Alert.alert('notification on background state', remoteMessage.notification.body);
    });
  };

