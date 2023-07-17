import React, {Component} from 'react';
import { View,StyleSheet,Text} from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { WebView } from 'react-native-webview';

const WebViewScreen = (props) => {
 
  const detail = props?.route?.params?.delail


return (
     <WebView
          source={{uri:"https://meet.google.com/thk-ypen-qik"}}
        />

  
);
}

export default WebViewScreen
