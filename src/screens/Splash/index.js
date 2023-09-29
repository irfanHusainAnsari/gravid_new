/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View ,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission,notificationListener } from '../../../src/utils/notigicationServices';
import  messaging from '@react-native-firebase/messaging';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = (props) => {
  console.log(windowWidth,windowHeight)
  useEffect(() => {
    navigationOnClick()
  }, []);

  const navigationOnClick = async () => {
    setTimeout(async () => {
      const jsondata = await AsyncStorage.getItem('valuedata');
      if (jsondata !== null) {
        console.log("JSONDATA====", jsondata);
        props.navigation.reset({ index: 0, routes: [{ name: "BottomTabs"}]})
        // props.navigation.navigate("BottomTabs")
      } else {
        props.navigation.reset({ index: 0, routes: [{ name: "Introduction" }] })
        // props.navigation.navigate("Introduction")
      }
    }, 2000);
  }
  useEffect(() => {
    requestUserPermission();
    notificationListener()
    messaging().setBackgroundMessageHandler( async remoteMessage =>{
      console.log('App11111111111',remoteMessage)
    })
   }, [])
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/images/Splash-bg.png')} resizeMode="cover" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{width:windowWidth-50,resizeMode:"contain"}}
          source={require('../../assets/images/logo_white.png')}
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
