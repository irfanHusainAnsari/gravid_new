import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import messaging from '@react-native-firebase/messaging';


const ForegroundNotification = () => {

  useEffect(() => {
    
    const unsubscribe = messaging().onMessage((remoteMessage)=>{
          console.log('handle in foregound', remoteMessage)
    })
   return unsubscribe
   
  }, [])
// render
  return null
}

export default ForegroundNotification
