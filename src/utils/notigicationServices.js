import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

 export async function requestUserPermission() {
 
  const authStatus = await messaging().requestPermission();
  console.log('permission',authStatus)
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken()
    console.log('Authorization status:', authStatus);
  }
}

const getFcmToken =async ()=>{
  let fcmToken = await AsyncStorage.getItem("fcmToken")
  console.log('old token', fcmToken)
  if(!fcmToken){
    try {
      const fcmToken = await messaging().getToken();
    if(fcmToken){
      console.log('New generated Token',fcmToken)
      await AsyncStorage.setItem("fcmToken",fcmToken)
    }
    } catch (error) {
      console.log(error, "error raised in fcm token")
    }
  }

}

export const notificationListener = async ()=>{
 
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().getInitialNotification().then(remoteMessage => {
    console.log('remoteMessage22222', remoteMessage)
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    }
   
  });



}

