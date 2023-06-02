import React, { useEffect,useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './src/navigator/Navigators';
import BottomTabs from './src/navigator/BottomTabs';
import { requestUserPermission,notificationListener } from './src/utils/notigicationServices';
import ForegroundNotification from './src/utils/ForegroundNotification';
import  messaging from '@react-native-firebase/messaging';


const App = (props) => {
 
  useEffect(() => {
    requestUserPermission();
    notificationListener()
    messaging().setBackgroundMessageHandler( async remoteMessage =>{
      console.log('App11111111111',remoteMessage)
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