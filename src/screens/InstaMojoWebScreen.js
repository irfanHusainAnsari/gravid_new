import React,{useState} from 'react'
import { View, TouchableOpacity ,ToastAndroid,Text,Image,Linking} from 'react-native'
import { WebView } from 'react-native-webview';
import { svgs, colors,fonts } from '@common';
import Modal from 'react-native-modal';

const InstaMojoWebScreen = (props) => {
  console.log('props', props)
  const { instamojoData } = props?.route?.params
  const [modalVisible, setModalVisible] = useState(false);
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
    const onPressBack =()=>{
      setModalVisible(true)
      // props.navigation.navigate("BottomTabs")
    }
    const joinNow = async ()=>{
      // setModalVisible(false)
      await Linking.openURL(`https://chat.whatsapp.com/DuH2uCA5q7tEj4cNa4mSZs`);
    }

 const onPressCloseButton =()=>{
      setModalVisible(false)
      props.navigation.navigate("BottomTabs")
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
        <TouchableOpacity style={{ flex: 3 }} onPress={onPressBack}>
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
      <Modal
        isVisible={modalVisible}
       >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 25,
          }}>
          <View style={{}}>
            <TouchableOpacity onPress={onPressCloseButton}>
                <Image source={require("../assets/images/close1.png")} style={{width:15,height:15,position:"absolute",right:20,top:20}}/>
            </TouchableOpacity>
              
              <Image source={require("../assets/images/GRAVID_O.png")} style={{width:100,height:100,alignSelf:"center",marginTop:20}}/>
             
              <View style={{marginTop:20}}>
                <Text style={{alignSelf:"center",fontFamily:fonts.OptimaBold,color:"#000",fontSize:16}}>Join Our WhatsApp Community</Text>
                <View style={{flexDirection:"row",
                              alignSelf:"center",
                              backgroundColor:colors.themeColor,
                              paddingHorizontal:20,
                              borderRadius:10,
                              paddingVertical:8,
                              marginTop:20,marginBottom:20}}>
                <Image source={require("../assets/images/whatsapp.png")} style={{width:20,height:20,alignSelf:"center"}}/>
                <TouchableOpacity onPress={joinNow}>
                    <Text style={{fontFamily:fonts.OptimaBold,marginLeft:10}}>Join Now</Text>
                </TouchableOpacity>
               
                </View>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default InstaMojoWebScreen
