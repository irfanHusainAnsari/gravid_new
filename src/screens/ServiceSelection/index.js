import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import styles from './style';
import {svgs, colors} from '@common';
import Apis from '../../Services/apis';
import RenderHtml from 'react-native-render-html';
const {width, height} = Dimensions.get('window');
import {imageurl} from '../../Services/constants';
import fonts from '../../common/fonts';
import {useState} from 'react';

const ServiceSelection = props => {
  const [catOpen, setCatOpen] = useState(false);
  const [consultantOpen, setConsultantOpen] = useState(true);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceList, setServiceList] = useState('Select Service');
  const [finalserviceselect, setfinalserviceselect] =useState('Select Service');
  const serviceArray = [
    {name: 'Gynecology/Obstained', service: ['irfan']},
    {name: 'Pediatsss', service: ['aakash', 'sandesh', 'ravi']},
    {name: 'Gynecol', service: ['om', 'ji']},
  ];

  const consultantArray = [
                            {name:"Dr. Ritu", price:1000},
                            {name:"Dr. Chaudhary", price:1000},
                            {name:"Dr. Amir", price:1000},
                            {name:"Dr. irfan husain ansari", price:1000},
                          ]

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Service Selection</Text>
        <View style={{flex: 3}} />
      </View>
      <View style={styles.radiusView} />

      <View style={{paddingHorizontal: 24}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.OptimaBold,
            color: '#000',
            marginBottom: 15,
          }}>
          Service Selection
        </Text>
        <Text
          style={{fontSize: 16, fontFamily: fonts.OptimaMedium, color: '#000'}}>
          Service :
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              setCatOpen(!catOpen);
              setfinalserviceselect("select service")
            }}
            style={styles.touchableOpacity}>
            <Text style={{color: '#6D7A90', fontFamily: fonts.OptimaRegular}}>
              {finalserviceselect}
            </Text>

            <Image
              style={styles.dropdownImage}
              source={require('../../assets/images/dropdown.png')}
            />
          </TouchableOpacity>
        </View>
        {catOpen &&  <View
          style={{
            elevation: 5,
            backgroundColor: 'white',
            marginTop: 5,
            borderRadius: 7,
            paddingHorizontal: 10,
           
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:4,borderRightWidth:.5,borderRightColor:"gray", paddingVertical:10}}>
              <Text style={{fontFamily:fonts.OptimaBlack,color:"#000",marginBottom:3}}>Category</Text>
              <View style={{marginBottom:2}}>
              
                    {serviceArray.map((service)=>{
                      return(
                        <TouchableOpacity  onPress={() => {
                          setServiceOpen(true);
                          setServiceList(service.service);
                          setfinalserviceselect("select service")
                        }}>
                          <Text style={{fontFamily:fonts.OptimaMedium,fontSize:12,marginVertical:2}}>{service.name}</Text>
                        </TouchableOpacity>
                      )
                    })}
                   
              
              </View>
            </View>
          <View style={{flex:5,paddingLeft:10,paddingVertical:10}}>
          <Text style={{fontFamily:fonts.OptimaBlack,color:"#000",marginBottom:3}}>Service</Text>
          {catOpen && serviceOpen && (
              <View style={{}}>
                {serviceList.map((servicename)=>{
                  return(
                    <TouchableOpacity
                        onPress={() => {
                          setCatOpen(false);
                          setServiceOpen(false);
                          setfinalserviceselect(servicename);
                        }}>
                    <Text style={{fontFamily:fonts.OptimaMedium,fontSize:12,marginVertical:2}}>{servicename}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
           
          )}
            
          </View>
        </View>
        </View> }
         
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.OptimaMedium,
            color: '#000',
            marginTop: 20,
          }}>
          Consultant :
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              setConsultantOpen(!consultantOpen)
            }}
            style={styles.touchableOpacity}>
            <Text style={{color: '#6D7A90', fontFamily: fonts.OptimaRegular}}>
              Select Consultant
            </Text>

            <Image
              style={styles.dropdownImage}
              source={require('../../assets/images/dropdown.png')}
            />
          </TouchableOpacity>
        </View>

          {consultantOpen && 
          <View style={{backgroundColor:"#fff",borderRadius:8,marginTop:8,elevation:5,padding:10}}>
              {consultantArray.map((item)=>{
              
                return(
                    <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:8}} onPress={()=>console.log('item',item)}>
                      <View style={{flexDirection:"row",alignItems:"center",flex:.8,backgroundColor:"red"}}>
                      <Image source={require("../../assets/images/profile.png")} style={{width:30,height:30,resizeMode:"contain"}}/>
                      <Text style={{marginLeft:8}}>{item.name}</Text>
                      </View>
                      <Text style={{alignSelf:"center",flex:.2,justifyContent:"flex-end"}}>{item.price}</Text>
                    </TouchableOpacity>
                )
              })}
          </View>
          }
        <TouchableOpacity style={styles.buttonBookNow}>
          <Text style={styles.buttonTitle}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceSelection;
