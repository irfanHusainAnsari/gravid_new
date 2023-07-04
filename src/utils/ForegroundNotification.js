import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import messaging from '@react-native-firebase/messaging';


const ForegroundNotification = (props) => {
  console.log('props<<<<<', props)

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
