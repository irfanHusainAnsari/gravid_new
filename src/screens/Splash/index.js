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

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/images/Splash-bg.png')} resizeMode="cover" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{width:windowWidth-50,resizeMode:"contain"}}
          source={require('../../assets/images/gravid-logo.png')}
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
