import React, {Component} from 'react';
import { View,StyleSheet,Text, Linking} from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { WebView } from 'react-native-webview';

const WebViewScreen = (props) => {
  const detail = props?.route?.params?.delail
  console.log("=================",`https://${detail?.web_link}`)
 const onMessage = ({ nativeEvent }) => {
  console.log('nativeEvent', nativeEvent)
    const data = nativeEvent.data;
    if (data !== undefined && data !== null) {
      Linking.openURL(data);
    }
  }
// render
return (
     <WebView
          source={`https://${detail?.web_link}`}
          onMessage={() => onMessage()}
           // Linking.openURL(`https://${delail?.web_link}`);
        />

  
);
}

export default WebViewScreen
