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

const ExpertListDetail = props => {
  const ExpertDetail = props?.route?.params?.item;
  // const [delail, setDetail] = useState();
  // useEffect(() => {
  //     HomePagedata();
  // }, [])

  // const HomePagedata = () => {
  //     const params = {
  //         id: BlogDetail.id,
  //         type: 1
  //     }
  //     Apis.HomeListsDetails(params)
  //         .then(async (json) => {
  //             console.log('Detail=====:', JSON.stringify(json))
  //             if (json.status == true) {
  //                 setDetail(json.data)
  //             }
  //         })
  // }

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Expert </Text>
        <View style={{flex: 3}} />
      </View>
      <View style={styles.radiusView} />
      <ScrollView
        style={{paddingHorizontal: 16}}
        showsVerticalScrollIndicator={false}>

                <View style={{position: 'absolute',right:10, top:190,zIndex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{}} onPress={()=>console.log('object')}>
                        <Image
                            source={require('../../assets/images/call.png')}
                            style={{width: 30, height: 30, resizeMode: 'contain'}}
                        />
                        </TouchableOpacity >
                        <View style={{width:10}}/>
                    
                        <TouchableOpacity style={{}}>
                        <Image
                            source={require('../../assets/images/videoCall.png')}
                            style={{width: 30, height: 30, resizeMode: 'contain'}}
                        />
                        </TouchableOpacity>
                    </View>
                    </View>
        <Image
          style={styles.ScreenshotImage}
          source={{uri: imageurl + ExpertDetail.file}}
        />
        

        <Text style={styles.CONTRIBUTORSTEXT}>{ExpertDetail.name}</Text>
        <RenderHtml
          contentWidth={width}
          source={{html: ExpertDetail.description}}
        />
        <TouchableOpacity
          style={styles.bookNowBtn}
          onPress={() =>
           props.navigation.navigate("ServiceSelection")
            // Linking.openURL('https://gravidparenting.com/consultation')
          }>
          <Text style={styles.bookNowBtnTxt}>Book Now</Text>
        </TouchableOpacity>
        {/* <Text style={styles.loremText}>{ExpertDetail.description}</Text> */}
      </ScrollView>
    </View>
  );
};

export default ExpertListDetail;
