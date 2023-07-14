import react, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import styles from './style';
import fonts from '../../common/fonts';
import Apis from '../../Services/apis';
import {useIsFocused} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {svgs, colors} from '@common';
import { imageurl } from '../../Services/constants';
const {width, height} = Dimensions.get('window');
const Packages = props => {
  const isFocused = useIsFocused();
  const [packageData, setPackageData] = useState('');
 
  const [packagelist, setPackagelist] = useState([]);
  const [packageListSearch, setPackageListSearch] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [searchTxt, setSearchTxt] = useState('');
  const [cartCount, setCartCount] = useState('');
  

  useEffect(() => {
    getPackageData();
    getCart();
  }, [isFocused]);

  useEffect(() => {
    if (searchTxt && searchTxt != '') {
      setPackageListSearch(
        packagelist.filter(item =>
          item.short_description?.toLowerCase().includes(searchTxt.toLowerCase()) || item.title?.toLowerCase().includes(searchTxt.toLowerCase())
        ),
      );
    }
  }, [searchTxt]);

  const getPackageData = () => {
    setIsLoader(true);
    Apis.getPackageItem({})
      .then(async json => {
       console.log('getPackageData==', json.data)
        if (json.status == true) {
          setPackagelist(json?.data)
          setPackageData(json?.data[0].programs);
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
  const handleWebinarDetail = item => {
    props.navigation.navigate('NewPackegedetail', {paid: item});
  };

  const LiverenderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleWebinarDetail(item)}
        style={styles.NewsLetterView}>
        <Image source={{uri: imageurl + item.image}} style={styles.newsImg} />
        <View style={styles.paidType}>
          <Text style={styles.paidTypeTxt}>Paid</Text>
        </View>
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <Text style={styles.haddingTxt}>Packages</Text>
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
                ?packageListSearch
                :packagelist 
              }
              numColumns={2}
              style={{paddingLeft: 16, marginTop: 0, flexDirection: 'row'}}
              renderItem={LiverenderItem}
              keyExtractor={item => item.id}
            />

           
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default Packages;
