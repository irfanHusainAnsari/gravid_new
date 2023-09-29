import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
  Dimensions
} from 'react-native';
import {svgs, colors, fonts} from '@common';
import DatePicker from 'react-native-date-picker';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import CalendarStrip from 'react-native-calendar-strip';
import Modal from "react-native-modal";

const windowWidth = Dimensions.get('window').width;

const PregnancyDetail = props => {
  console.log('objectprops', props)
  const [modalVisible, setModalVisible] = useState(false);
  const totalWeek = props?.route?.params?.json?.totalWeek;
  const data = props?.route?.params?.json?.data;
  console.log('data', data)
  const trackerDate = props?.route?.params?.navigateDate;
  console.log('data>>>>>>>', data)
  const date = new Date(trackerDate);
 
  let colorss = ['#abcdef','#88e374','#fdecba', '#123456'];
  
  return (
    <View style={styles.container}>
    <ScrollView>
        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 30, zIndex: 100}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>

       
        <View style={{alignSelf: 'center',marginTop:70,flexDirection:"row"}}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: '#fcb8b8',
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 4,
              fontFamily: fonts.OptimaBold,
              color: '#ffffff',
              alignSelf:"center",
              paddingVertical:4
            }}>
            {props?.route?.params?.type} is {trackerDate}
          </Text>

          <View style={{marginLeft:10}}>
          <TouchableOpacity style={styles.editview} onPress={() => { props.navigation.navigate('PregnancyTracker',{trackerDate:trackerDate,types:props?.route?.params?.type}) }}>
            {svgs.editProfile(colors.black, 16, 14)}
            <Text style={styles.edittext}>  Edit</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{alignItems: 'center', marginTop:50}}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: '#fcb8b8',
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 4,
              fontFamily: fonts.OptimaBold,
              color: '#ffffff',
              paddingVertical:4
            }}>
            Total week is {totalWeek}
          </Text>
        </View>
        {data?.image != null ? 
        <Image
        source={{uri: imageurl +  data?.image}}
         style={{
           width:300,
           height:300,
           resizeMode: 'contain',
           alignSelf: 'center',
           borderRadius:150,
           marginTop:25
         }}/>:
         <Image
         source={require("../../../src/assets/images/pedeitric.png")}
          style={{
            width:300,
            height:300,
            resizeMode: 'contain',
            alignSelf: 'center',
            borderRadius:150,
            marginTop:25
          }}/>
        }

        <TouchableOpacity style={{position:"absolute",right:15,top:260}} onPress={()=>setModalVisible(true)}>
        <Image
               source={require("../../assets/images/plus.png")}
                style={{
                  width:50,
                  flex: 1,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  borderBottomLeftRadius:4,
                  borderBottomRightRadius:4
                }}
              />
        </TouchableOpacity>
        

        <View style={{paddingHorizontal:13.5}}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={{marginTop:70,marginHorizontal:5,marginBottom:10}}
                  activeOpacity={.8}
                  onPress={()=>props.navigation.navigate("PregnancyDetailView",
                  {data:data?.baby_development,type:"Baby development",image:data?.baby_development_img}
                  )}
            >
            <View
              style={{
                width: windowWidth/2.27,
                height: 120,
                elevation: 5,
                backgroundColor:"#fcb8b8",
                borderRadius:10,
              }}>
            <View style={{ flex:.7,alignItems:"center",justifyContent:"center"}}>
            <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.OptimaDemiBold,
                  lineHeight: 15,
                  color:"#000000"
                }}>
                  Baby Development
              </Text>
            </View>
              { data?.baby_development_img !== null ?
              
              <Image
              source={{uri: imageurl +  data?.baby_development_img}}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'cover',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
             :
             <Image
              source={require("../../assets/images/welcome-logo.png")}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'contain',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
            
            }
             
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 70,marginHorizontal:5,marginBottom:10}}
                  activeOpacity={.8}
                  onPress={()=>props.navigation.navigate("PregnancyDetailView",
                  {data:data?.body_changes,type:"Body Changes",image:data?.body_changes_img}
                  )}
            >
            <View
              style={{
                width: windowWidth/2.27,
                height: 120,
                elevation: 5,
                backgroundColor:"#fcb8b8",
                borderRadius:10,
              }}>
            <View style={{ flex:.7,alignItems:"center",justifyContent:"center"}}>
            <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.OptimaDemiBold,
                  lineHeight: 15,
                  color:"#000000"
                }}>
                  Body Changes
              </Text>
            </View>
              
              {/* <Image
               source={{uri: imageurl + data.body_changes_img}}
                style={{
                  width:"100%",
                  flex: 1,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  borderBottomLeftRadius:4,
                  borderBottomRightRadius:4
                }}
              /> */}
              { data?.body_changes_img !== null ?
              
              <Image
              source={{uri: imageurl +  data?.body_changes_img}}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'cover',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
             :
             <Image
              source={require("../../assets/images/welcome-logo.png")}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'contain',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
            
            }
            </View>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row"}}>

            <TouchableOpacity style={{marginTop:10,marginHorizontal:5,marginBottom:10}}
                  activeOpacity={.8}
                  onPress={()=>props.navigation.navigate("PregnancyDetailView",
                  {data:data?.common_symtoms,type:"Common Symptoms",image:data?.common_symtoms_img})}
            >
            <View
              style={{
                width:windowWidth/2.27,
                height: 120,
                elevation: 5,
                backgroundColor: '#fcb8b8',
                borderRadius:10,
              }}>
            <View style={{ flex:.7,alignItems:"center",justifyContent:"center"}}>
            <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.OptimaDemiBold,
                  lineHeight: 15,
                  color:"#000000"
                }}>
                  Common Symptoms
              </Text>
            </View>
              
              {/* <Image
               source={{uri: imageurl + data.common_symtoms_img}}
                style={{
                  width:"100%",
                  flex: 1,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  borderBottomLeftRadius:4,
                  borderBottomRightRadius:4
                }}
              /> */}

          { data?.common_symtoms_img !== null ?
              <Image
              source={{uri: imageurl +  data?.common_symtoms_img}}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'cover',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
             :
             <Image
              source={require("../../assets/images/welcome-logo.png")}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'contain',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
            
            }



            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 10,marginHorizontal:5,marginBottom:10,marginRight:20}}
                  activeOpacity={.8}
                  onPress={()=>props.navigation.navigate("PregnancyDetailView",
                  {data:data?.tips,type:"Tips",image:data?.tips_img})}
            >
            <View
              style={{
                width:windowWidth/2.27,
                height: 120,
                elevation: 5,
                backgroundColor: '#fcb8b8',
                borderRadius:10,
              }}>
            <View style={{ flex:.7,alignItems:"center",justifyContent:"center"}}>
            <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.OptimaDemiBold,
                  lineHeight: 15,
                  color:"#000000"
                }}>
                  Tips
              </Text>
            </View>
              
              {/* <Image
               source={{uri: imageurl + data.tips_img}}
                style={{
                  width:"100%",
                  flex: 1,
                  resizeMode:"stretch",
                  alignSelf: 'center',
                  borderBottomLeftRadius:4,
                  borderBottomRightRadius:4
                }}
              /> */}
              { data?.tips_img !== null ?
              <Image
              source={{uri: imageurl +  data?.tips_img}}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'cover',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
             :
             <Image
              source={require("../../assets/images/welcome-logo.png")}
               style={{
                 width:"100%",
                 flex: 1,
                 resizeMode: 'contain',
                 alignSelf: 'center',
                 borderBottomLeftRadius:4,
                 borderBottomRightRadius:4
               }}
             />
            
            }
            </View>
            </TouchableOpacity>
            </View>

          </View>
       
         
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
              >
              <View style={{backgroundColor:"#ffffff",height:300,borderRadius:10}}>
                <TextInput
                        multiline={true}  textAlignVertical="top"
                        style={{  height: 200,
                                  margin: 12,
                                  borderWidth: 1,
                                  borderColor:"gray",
                                  borderRadius:5,
                                  marginTop:20,
                                  padding: 10}}
                        placeholder="Log Your Symptom"
                        placeholderTextColor={"#000000"}
                        keyboardType="name-phone-pad"
                      />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => { setModalVisible(false) }}>
                      <Text style={styles.submitBtnTxt}>SUBMIT</Text>
                    </TouchableOpacity>
              </View>

              </Modal>

    </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default PregnancyDetail;
