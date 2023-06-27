import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigator/Navigators';
import BottomTabs from './src/navigator/BottomTabs';
import { requestUserPermission, notificationListener } from './src/utils/notigicationServices';
import ForegroundNotification from './src/utils/ForegroundNotification';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
const App = (props) => {
  // PushNotification.configure({
  //   onNotification: function (notification) {
  //     console.log("[onNotification] :", notification);
  //     if (notification.userInteraction) {
  //       alert("ookkkk")
  //     }
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });
  useEffect(() => {
    requestUserPermission();
    notificationListener()
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('App11111111111', remoteMessage)
    })
  }, [])

  return (
    <>
      <ForegroundNotification />
      <NavigationContainer>
        <Navigators />
      </NavigationContainer>
    </>
  );
};

export default App