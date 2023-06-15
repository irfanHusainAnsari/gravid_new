import React,{useState} from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { styles } from './style';
import Apis from '../../Services/apis';
import { useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import {fonts,colors} from '../../common';
import { imageurl } from '../../Services/constants';
// import { appointmentCardData } from '../../Common/FlatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';


const Cart = (props) => {
    const [isLoader, setIsLoader] = useState(false)
    const [cartData, setCartData] = useState("")
    const [taxData, setTaxData] = useState("")
    const [userData, setUserData] = useState({});
            console.log('userData', userData)
    const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
    const totalAmount = taxDataitem+cartData?.amount
    
    useEffect(() => {
        getCart();
        setUserProfileData();
    }, [])

    const setUserProfileData = async () => {
        // console.log('object');
        try {
          const jsondata = await AsyncStorage.getItem('valuedata');
          console.log('jsondata', jsondata);
          if (jsondata !== null) {
            var newVal = JSON.parse(jsondata);
            setUserData(newVal);
            console.log('imageurl + newVal.profile', imageurl + newVal.profile);
            setShowdpimage({path: imageurl + newVal.profile});
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    const getCart = ()=>{
        setIsLoader(true);
        Apis.getCartData({})
          .then(async (json) => {
            console.log('getCartData000000',json);
            if (json.status == true) {
                setCartData(json?.data[0])
                setTaxData(json?.taxData)
            }
            setIsLoader(false);
          }).catch((error) => {
            console.log("error", error);
            setIsLoader(false);
          })
    }


const  appointmentCardData = [
    {
      id: 1,
      AppointmentTextName: 'Appointment: ',
      oneTextName: '1',
      AppointmentInfoText: 'Appointment Info:',
      LocalTimeText: 'Local Time:',
      MayTimeTextL: 'May 3, 2023 5:30 pm',
      ServiceTextName: 'Service:',
      ObstetricsTextNAme: 'Obstetrics & Gynaecology',
      ConsultantTextName: 'Consultant:',
      DrRituChaudhary: 'Dr. Ritu Chaudhary',
      PriceTextName: 'Price:',
      DolerText: '1000/-',
      Cancel_Image: require('../../assets/images/close.png'),
    },]

    const removeCart = ()=>{
            setIsLoader(true);
           const params={
                id:cartData?.id
            }
            Apis.RemoveCart(params)
              .then(async (json) => {
                console.log('RemoveCart00',json);
                if (json.status == true) {
                    Toast.show(json.message, Toast.LONG);
                    setCartData("")
                    props.navigation.goBack();
                }
                setIsLoader(false);
              }).catch((error) => {
                console.log("error", error);
                setIsLoader(false);
              })
      }

      const handleInstamozo = () => {
        console.log('handleInstamozo', handleInstamozo)
        setIsLoader(true);
        const params = {
            type: 2,
            type_id: cartData?.data_id,
            amount: totalAmount,
            purpose: cartData?.category?.title,
            phone: userData?.mobile,
            buyer_name: userData?.name,
            email: userData?.email,
            cart_id:cartData?.id,
            tax_amount:taxDataitem,
            tax_percent:taxData?.gst,
            paid_amount:totalAmount,
        };
        console.log('params', params)
        Apis.instaMojoPayment(params)
          .then(async json => {
            console.log('json,,,', json)
            if (json.status == true) {
    
              props.navigation.navigate('InstaMojoWebScreen', {
                instamojoData: json,
              });
              // handleUpdatePayment(json?.payment_request?.id)
              // console.log('paymentInstamojo', JSON.stringify(json.payment_request));
              // alert("Payment Success")
              // setMagazineDetail({ ...magazineDetail, check_payment: json.data });
            }
            setIsLoader(false);
          })
          .catch(error => {
            console.log('error', error);
            setIsLoader(false);
          });
      };






    const renderDataItem = ({ item }) => {

        return (
            <View style={{}}>
                <View style={styles.appointmentCard}>
                    <View style={{ flex: 2 }}>
                    <View style={styles.appointmentImage}>
                        {/* <Image source={{uri:imageurl+cartData?.get_webinar?.image}} style={{width:90,height:120,resizeMode:"cover"}} */}
                        <Image source={{uri: cartData.type == "webinar" ?
                                             imageurl+cartData?.get_webinar?.image :
                                             cartData.type == "program" ?
                                             imageurl+cartData?.get_program?.image :null }} style={{width:90,height:120,resizeMode:"cover"}}
                        />
                    </View>
                    </View>
                    <View style={{ flex: 5, marginLeft: 10, }}>
                        <Text style={styles.appointmentText}>{item.AppointmentTextName}  <Text style={styles.one1Text}>1</Text></Text>
                        <Text style={styles.appointmentText}>{item.AppointmentInfoText}  <Text style={styles.localTimeText}>Date & Time :</Text></Text>
                        <Text style={styles.time}>{cartData?.sloat_date} {cartData?.slot_form}</Text>
                        <Text style={styles.appointmentText}>{item.ServiceTextName}   <Text style={styles.time}>{cartData?.category?.title}</Text></Text>
                        <Text style={styles.appointmentText}>{item.ConsultantTextName}     <Text style={styles.time}>{cartData?.get_expert?.name}</Text></Text>
                        <Text style={styles.appointmentText}>{item.PriceTextName}  <Text style={styles.time}>{cartData?.amount} /-</Text></Text>
                    </View>
                    {/* <View style={{ flex: 1, }}> */}
                        {/* <TouchableOpacity style={styles.cancelImageCOntainer}>
                            <Image style={{ width: 15, height: 15 }} source={item.Cancel_Image} />
                        </TouchableOpacity> */}
                    {/* </View> */}
                </View>
                <View style={styles.boderContainer}></View>
            </View>
        )
    }
    return (
        <>
        { cartData == undefined ?
        <>
        <View style={styles.mainContainer}>
        <View style={styles.headersContainer}>
            <View style={styles.headerTop}>
                <TouchableOpacity style={{ flex: 1, }} onPress={()=>props.navigation.goBack()}>
                    <Image style={styles.headerIcons} source={require('../../assets/images/Header_Image.png')} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle}>Cart</Text>
                </View>
                <View style={{ flex: 1, }}></View>
            </View>
        </View>
         <View style={styles.colorContainer}>
            </View>
            </View>
            <View style={{flex:1,backgroundColor:"#ffffff",alignItems:"center"}}>
                <Text style={{fontFamily:fonts.OptimaBlack,fontSize:18,color:"#000"}}>There is no item in cart</Text>
            </View>
            </>
           :
           <View style={styles.mainContainer}>
           <View style={styles.headersContainer}>
               <View style={styles.headerTop}>
                   <TouchableOpacity style={{ flex: 1, }} onPress={()=>props.navigation.goBack()}>
                       <Image style={styles.headerIcons} source={require('../../assets/images/Header_Image.png')} />
                   </TouchableOpacity>
                   <View style={{ flex: 1 }}>
                       <Text style={styles.headerTitle}>Cart</Text>
                   </View>
                   <View style={{ flex: 1, }}></View>
               </View>
           </View>
            <View style={styles.colorContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={appointmentCardData}
                    keyExtractor={item => item.id}
                    renderItem={renderDataItem}
                />
                <View style={styles.couponContainer}>
                    <TextInput style={styles.couponCodeText} placeholder='Coupon Code' placeholderTextColor={"#000"}/>
                    <TouchableOpacity style={styles.buttonApply}>
                        <Text style={styles.buttonTitles}>Apply</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subtotalContainers}>
                    <Text style={styles.subtotalTitleText}>Subtotal</Text>
                    <Text style={{ color:colors.themeColor, fontSize: 16 }}>{cartData?.amount}</Text>
                </View>
                <View style={{borderStyle:'dashed',borderWidth:0.5,borderColor:'red',marginTop:10}}></View>
                <View style={styles.subtotalContainers}>
                    <Text style={styles.subtotalTitleText}>Tax (GST 18%)</Text>
                    <Text style={{ color:colors.themeColor, fontSize: 16 }}>₹ {taxDataitem}</Text>
                </View>
              
                <View style={styles.countButton}>
                    <Text style={styles.titleText}>Total Amount</Text>
                    <Text style={{ color: '#000', fontSize: 16,fontWeight:'600' }}>₹{totalAmount}</Text>
                </View>
                {/* <TouchableOpacity style={styles.buttonBookNow}>
                    <Text style={styles.buttonTitle}>Proceed to checkout</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.buttonBookNow} onPress={removeCart}>
                    <Text style={styles.buttonTitle}>Remove Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBookNow} onPress={handleInstamozo}>
                    <Text style={styles.buttonTitle}>Proceed To Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
       </View>
     
        }

        </>
        
    );
};

export default Cart;