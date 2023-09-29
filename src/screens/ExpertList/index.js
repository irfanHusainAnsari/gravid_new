/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {svgs} from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import {useIsFocused} from '@react-navigation/native';

// const imageurl = "https://rasatva.apponedemo.top/gravid/"

const ExpertList = props => {
  const isFocused = useIsFocused();
  const [expertData, setExpertData] = useState([]);
  console.log('expertData', expertData)
  
  const [expertListSearch, setExpertListSearch] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pinCodeSearch, setPinCodeSearch] = useState('');
  const [specializationSearch, setSpecializationSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [cartCount, setCartCount] = useState("")
  useEffect(() => {
    HomePagedata();
    getCart();
    setSearchTxt("")
    setSpecialization("")
    setCity("")
    setPinCode("")
  }, [isFocused]);
console.log('filter', filter)
  const getCart = () => {
    setIsLoader(true);
    Apis.getCartData({})
      .then(async json => {
        setCartCount(json?.cartCount)
       
        if (json.status == true) {
          setCartData(json?.data[0]);
          setTaxData(json?.taxData);
          
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  useEffect(() => {
    if (searchTxt && searchTxt != '') {
      setExpertListSearch(
        expertData?.filter(item =>
            item.name?.toLowerCase().includes(searchTxt.toLowerCase())
        ),
      );
    }
    if (specialization && specialization != '') {
      setSpecializationSearch(
        expertData.filter(item =>
          item?.short_description?.toLowerCase().includes(specialization.toLowerCase()),
        ),
      );
    }
    if (city && city != '') {

      setCitySearch(
        expertData.filter(item =>
        item?.city
            .toLowerCase()
            .includes(city.toLowerCase()),
        ),
      );
    }
    if (pinCode && pinCode != '') {
      setPinCodeSearch(
        expertData.filter(item =>
        item?.pincode
            .toLowerCase()
            .includes(pinCode.toLowerCase()),
        ),
      );
    }
  }, [searchTxt, specialization,city,pinCode]);

  const HomePagedata = () => {
    setIsLoader(true);
    Apis.ExpertList({})
      .then(async json => {
        if (json.status == true) {
          setExpertData(json.data);
        }
        setIsLoader(false);
      })
      .catch(error => {
        setIsLoader(false);
        console.log('ExpertList', error);
      });
  };

  const renderItemNewsLetter = ({item}) => {
    console.log('itemwwwww', item)
    return (
      <View style={{flex: 0.5, marginLeft:8,marginRight:8}}>
        <TouchableOpacity
          key={item.id}
          style={styles.NewsLetterView}
          onPress={() => props.navigation.navigate('ExpertListDetail', {item})}>
          <Image source={{uri: imageurl + item.file}} style={styles.newsImg} />
          <Text style={styles.issuetitle}>{item.name}</Text>
          <Text style={styles.issueDes} numberOfLines={5}>
            {item.short_description}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const oncallcity = (text) => {
  //   const data = expertData.filter((item) => item.city == text).map(({id, name, city}) => ({id, name, city}));
  //   console.log("================data",data)
  //   if(text.length == 0){
  //     HomePagedata()
  //   }
  //  if(data.length !=0){
  //   console.log("================",data)
  //   setExpertData(data)

  //  }
  // }

  return (
    <View style={styles.container}>

<View style={styles.haddingView}>
        <Text style={styles.haddingTxt}>Expert List</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20, top: 15 }}
          onPress={() => { props.navigation.navigate('Cart') }}>
          <Image style={styles.cart} source={require('../../assets/images/cart.png')} />
          <View style={{ position: "absolute", borderWidth: 1, borderRadius: 100, borderColor: colors.themeColor, width: 13, height: 13, right: -6, top: -8, backgroundColor: "white" }}>
            <Text style={{ fontSize: 10, color: colors.themeColor, marginHorizontal:3, marginTop:-1 }}>
              {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.radiusView} />

      {/* <View style={styles.haddingView}>

      <TouchableOpacity style={{position:"absolute",left:20,top:18}} onPress={() => props.navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>



        <Text style={styles.haddingTxt}>Expert List</Text>
       

        <TouchableOpacity
          style={{position:"absolute",right:20,top:15}}
          onPress={() => { props.navigation.navigate('Cart') }}>
          <Image style={styles.cart} source={require('../../assets/images/cart.png')}/>
          <View style={{position:"absolute",borderWidth:1,borderRadius:100,borderColor:colors.themeColor,width:13,height:13,right:-6,top:-8, backgroundColor:"white"}}>
            <Text style={{fontSize:10,color:colors.themeColor,marginHorizontal:2.3,marginTop:-2}}>
            {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 3}} />
      </View> */}
      <View style={styles.manflatlistview}>
        {/* <ScrollView nestedScrollEnabled={true}> */}
        {isLoader ? (
          <View style={{marginTop: 300}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop:-20
              }}>
              <View style={styles.searchBoxView}>
                {svgs.search(colors.grayRegular, 17, 17)}
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={"#000000"}
                  style={styles.searchBox}
                  value={searchTxt}
                  onChangeText={setSearchTxt}
                />
              </View>
              <TouchableOpacity
                onPress={() => setFilter(!filter)}
                style={{marginBottom: 10, marginLeft: 9}}>
                <Image
                  style={{width: 43, height: 43, resizeMode: 'contain'}}
                  source={require('../../assets/images/dropdownpng.png')}
                />
              </TouchableOpacity>
            </View>
            {filter ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    flex: 0.8,
                    borderWidth: 0.5,
                    borderColor: '#E1E3E7',
                    borderRadius: 8,
                    height: 45,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F9FAFC',
                    marginRight: 8,
                  }}>
                  <TextInput
                    style={{flex: 1}}
                    placeholder="Category"
                    placeholderTextColor={"#000000"}
                    value={specialization}
                    onChangeText={setSpecialization}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E1E3E7',
                    borderRadius: 8,
                    height: 45,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 0.5,
                    marginRight: 8,
                    backgroundColor: '#F9FAFC',
                  }}>
                  <TextInput 
                      style={{flex: 1}} 
                      placeholder="City"
                      placeholderTextColor={"#000000"}
                      value={city}
                      onChangeText={setCity} />
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E1E3E7',
                    borderRadius: 8,
                    height: 45,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 0.4,
                    marginRight: 8,
                    backgroundColor: '#F9FAFC',
                  }}>
                  <TextInput 
                        style={{flex: 1}}
                        placeholder="Pincode"
                        placeholderTextColor={"#000000"}
                        onChangeText={setPinCode}
                         />
                </View>
                <TouchableOpacity
                  style={{
                    // flex: 0.3,
                    alignSelf: 'flex-end',
                    backgroundColor: '#FA8981',
                    width: 45,
                    height: 45,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {svgs.search(colors.blackContent, 17, 17)}
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{paddingHorizontal:10}}>
              <FlatList
                data={
                  searchTxt && searchTxt != ''
                    ? expertListSearch
                    : specialization && specialization != ''
                    ? specializationSearch
                    : city && city != ''
                    ? citySearch
                    : pinCode && pinCode != ''
                    ? pinCodeSearch
                    : expertData
                }
                renderItem={renderItemNewsLetter}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
              />
            </View>
          </View>
        )}
        {/* <View style={{ height: 90 }} /> */}
        {/* </ScrollView> */}
      </View>
      {filter == true ?
      <View style={{marginBottom:210}}></View>
      :
      <View style={{marginBottom: 100}}></View>
      }
      
    </View>
  );
};

export default ExpertList;
