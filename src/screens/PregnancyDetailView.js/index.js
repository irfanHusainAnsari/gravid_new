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
} from 'react-native';
import {svgs, colors, fonts} from '@common';
import {imageurl} from '../../Services/constants';
import styles from './style';
import RenderHtml from 'react-native-render-html';

const PregnancyDetailView = props => {
  const item = props?.route?.params;
  let data = item?.data;
  let image = item.image;
  const [type, setType] = useState(item.type);
  //  const[data,setData]=useState()

  console.log('item', item);

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <View style={{flex:1,height:35}}>
          <Text style={styles.haddingTxt}>{type}</Text>
        </View>
        <TouchableOpacity
          style={{width:24,height:24}}>
        
        </TouchableOpacity>
      </View>

      <View style={styles.radiusView} />
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
        {image !== null ? (
          <Image
            source={{uri: imageurl + image}}
            style={{
              width: '95%',
              height: 200,
              marginTop: 10,
              // flex: 1.2,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginBottom: 5,
            }}
          />
        ) : (
          <Image
            source={require('../../assets/images/welcome-logo.png')}
            style={{
              width: '95%',
              height: 200,
              //  flex: 1,
              resizeMode: 'contain',
              alignSelf: 'center',
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
        )}

        <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          <RenderHtml
            // contentWidth={width}
            source={{html: item?.data}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PregnancyDetailView;
