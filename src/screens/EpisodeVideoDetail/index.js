import React,{useState} from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import styles from './style'
import {svgs, colors,fonts} from '@common';
import { ScrollView } from 'react-native-gesture-handler';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
import Apis from '../../Services/apis';
import Toast from 'react-native-simple-toast';


const EpisodeVideoDetail = (props) => {
const {item} = props?.route?.params
const [isLoader, setIsLoader] = useState(false);
console.log('item', item)
const EpisodeAddtocard = (type) => {
  if(type == "free"){
    let form_data = new FormData();
    form_data.append("data_id",item?.id);
    form_data.append("category_id", item?.category_id);
    form_data.append("type", "episode"); //"episode"
    form_data.append("amount", 0);
    Apis.getDirect_order(form_data).then(async data => {
      console.log('data', data)
      setIsLoader(true);
      if(data.status == true){
        Toast.show(data.message, Toast.LONG)
        setIsLoader(false);
        props.navigation.goBack()
      }else{
        setIsLoader(false);
        Toast.show(data?.message, Toast.LONG)
      }
    }).catch((err)=>{console.log("errrr form_data" , err)})
  }else{
    
    setIsLoader(true);
    let form_data = new FormData();
    form_data.append("data_id", item?.id); //id
    form_data.append("category_id", item?.category_id); //category_id
    form_data.append("type", "episode"); //"episode"
    form_data.append("amount", item?.amount); //amount
    Apis.getCartPostSaveData(form_data).then(async data => {
      if (data.status == true) {
        Toast.show(data?.message, Toast.LONG)
        setIsLoader(false);
        props.navigation.navigate("Cart")
      }
      else {
        setIsLoader(false);
        Toast.show(data?.message, Toast.LONG)
      }
    }).catch((err) => {
      setIsLoader(false);
      console.log("errrr form_data", err);
    })

  }}

  return (
    <View style={styles.container}>
    <View style={styles.haddingView}>
      <TouchableOpacity
        style={{flex: 3}}
        onPress={() => props.navigation.goBack()}>
        {svgs.backArrow('black', 24, 24)}
      </TouchableOpacity>
   
        <Text style={styles.haddingTxt}>{item.title}</Text>
     
      <View style={{flex: 3}} />
    </View>
    <View style={styles.radiusView} />

    <ScrollView style={{marginHorizontal:16}} showsVerticalScrollIndicator={false}>
      <View style={{flex:1,marginBottom:20}}>
          <Image 
              source={{uri:imageurl+item.file}}
              style={{width:"100%",height:250,resizeMode:"contain",borderRadius:10}}
          />
          <Text style={{marginTop:20,fontFamily:fonts.OptimaBold,color:"#000"}}>Title :</Text>
          <Text>{item?.title}</Text>
          <Text style={{marginTop:20,fontFamily:fonts.OptimaBold,color:"#000"}}>Short Description :</Text>
          <Text>{item?.short_description}</Text>
          <Text style={{marginTop:20,fontFamily:fonts.OptimaBold,color:"#000"}}>Description :</Text>
          <RenderHtml
              // contentWidth={width}
              source={{html: item?.description}}
            />
      </View>

      {item?.check_payment?.id ? (
              <TouchableOpacity
                style={[styles.joinWebinarBtn,{marginBottom:50}]}
                onPress={() => (props.navigation.navigate("RecordedWebinarVidioList", { item: item }))}>
                <Text style={styles.joinWebinarBtnTxt}>View</Text>
              </TouchableOpacity>
            ) :
            item?.payment_type == 'Free' ?
            (
              <TouchableOpacity
                style={[styles.joinWebinarBtn,{marginBottom:50}]}
                onPress={()=>EpisodeAddtocard("free")}
                >
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            ):
             (
              <TouchableOpacity
                style={[styles.joinWebinarBtn,{marginBottom:50}]}
                onPress={EpisodeAddtocard}
                >
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )}
    </ScrollView>


    </View>
  )
}

export default EpisodeVideoDetail
