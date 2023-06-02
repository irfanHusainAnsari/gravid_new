import React from 'react'
import { View, TouchableOpacity ,ToastAndroid,Text} from 'react-native'
import { WebView } from 'react-native-webview';
import { svgs, colors,fonts } from '@common';


const InstaMojoWebScreen = (props) => {
  console.log('props', props)
  const { instamojoData } = props?.route?.params

  console.log('instamojodata', instamojoData)

const  onNavigationChange =(webViewState)=> {
    let hitUrl = webViewState.url;
    console.log("hitUrl",hitUrl);
    if (hitUrl.includes('https://www.instamojo.com/')) {
        console.log("11111",hitUrl);
        // we need the payment_req_id to get the status of paymnt
        let payment_final_id = hitUrl?.split("/")[4];
        var response = {
            url: hitUrl,
            payment_final_id: payment_final_id
        }
        console.log("payment_final_idsssssss",payment_final_id);
        // ToastAndroid.show('Success \n' + JSON.stringify(response), ToastAndroid.SHORT);
        // this.getPaymentDetails(payment_final_id);
    }
}



  // render
  return (
    <View style={{ flex: 1, }}>
      <View style={{
        backgroundColor: colors.themeColor,
        paddingTop: 16,
        paddingBottom: 40,
        flexDirection: "row",
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.navigate("BottomTabs")}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={{
                        fontFamily: fonts.OptimaBold,
                        color: colors.black,
                        fontSize: 18,
                    }}>Payment</Text>
                    <View style={{flex:3}}/>
      </View>
      <View style={{backgroundColor:"white",height:40,borderTopRightRadius:20,borderTopLeftRadius:20,marginTop:-20}}></View>
            
      <WebView
        // ref="webview"
        source={{ uri: instamojoData?.url }}
        onNavigationStateChange={onNavigationChange(instamojoData)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        // renderLoading={this.renderLoading.bind(this)}
        onMessage={(event) => console.log("hhhhhhh",event.nativeEvent.data)}
      />
    </View>
  )
}

export default InstaMojoWebScreen
