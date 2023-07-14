import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
  TextInput,
} from 'react-native';
import {svgs, colors} from '@common';
import styles from './style';
import Swiper from 'react-native-swiper';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import {useIsFocused} from '@react-navigation/native';

const Programs = props => {
  const isFocused = useIsFocused();
  const [programsListApi, setProgramsListApi] = useState([]);
  const [programsLiveSearch, setProgramsListSearch] = useState([]);
  const [btmSlider, setBtmSlider] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [cartCount, setCartCount] = useState("")

  useEffect(() => {
    if (searchTxt && searchTxt != '') {
      setProgramsListSearch(
        programsListApi.filter(item =>
          item.title?.toLowerCase().includes(searchTxt.toLowerCase()) ||  item.short_description?.toLowerCase().includes(searchTxt.toLowerCase())
        ),
      );
    }
  }, [searchTxt]);

  const handleWebinarDetail = item => {
    props.navigation.navigate('ProgramsDetail', {paid: item});
  };

  useEffect(() => {
    HomePagedata();
    getCart();
  }, [isFocused]);

  const HomePagedata = () => {
    const params = {};
    setIsLoader(true);
    Apis.programslistLive(params)
      .then(async json => {
        if (json.status == true) {
          setProgramsListApi(json?.data?.prgram_list);
          setBtmSlider(json?.data?.other_sliders?.data);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

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

  const LiverenderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleWebinarDetail(item)}
        style={styles.NewsLetterView}>
        <Image source={{uri: imageurl + item.image}} style={styles.newsImg} />
        <View style={styles.paidType}>
          <Text style={styles.paidTypeTxt}>{item.payment_type}</Text>
        </View>
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOtherSlider = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <Text style={styles.haddingTxt}>Programs</Text>
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
      </View>
      <View style={styles.radiusView} />

      <View style={styles.searchBoxView}>
        {svgs.search(colors.grayRegular, 17, 17)}
        <TextInput
          placeholder="Search                                                                         "
          style={styles.searchBox}
          value={searchTxt}
          onChangeText={setSearchTxt}
        />
      </View>

      <ScrollView>
        {isLoader ? (
          <View style={{marginTop: 200}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <FlatList
              data={
                searchTxt && searchTxt != ''
                  ? programsLiveSearch
                  : programsListApi
              }
              numColumns={2}
              style={{paddingLeft: 16, marginTop: 0, flexDirection: 'row'}}
              renderItem={LiverenderItem}
              keyExtractor={item => item.id}
            />

            <View style={styles.endView}>
              <Swiper
                activeDotStyle={{backgroundColor: 'transparent'}}
                dotStyle={{backgroundColor: 'transparent'}}
                autoplay={true}>
                {btmSlider?.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={
                        item.slider_url
                          ? () => handleOtherSlider(item.slider_url)
                          : null
                      }>
                      <Image
                        style={styles.endImg}
                        source={{uri: imageurl + item.image}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Swiper>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Programs;
