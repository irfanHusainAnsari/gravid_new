import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Apis from '../../Services/apis';
import {styles} from './style';
import fonts from '../../common/fonts';
import {imageurl} from '../../Services/constants';
import colors from '../../common/colors';

const OrderHistoryDetail = props => {
  const orderId = props?.route?.params;
  console.log('orderId', orderId)
  const [isLoader, setIsLoader] = useState(false);
  const [orderHistoryDetail, setOrderHistoryDetail] = useState('');

  useEffect(() => {
    getOrderHistoryData();
  }, []);

  const getOrderHistoryData = () => {
    setIsLoader(true);

    Apis.getOrderHistoryDetail(orderId)
      .then(async json => {
        console.log('getOrde???????', json);
        if (json.status == true) {
          setOrderHistoryDetail(json?.data);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerIconContainer}
          onPress={() => props.navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require('../../assets/images/headerIcon.png')}
          />
        </TouchableOpacity>
        <View style={styles.headerCenterContainer}>
          <Text style={styles.headerTitle}>Order Detail</Text>
        </View>
        <View style={styles.headerView}></View>
      </View>

      <View style={styles.mainFlexContainer}>
        {isLoader ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              borderRadius: 10,
              elevation: 2,
            }}>
            <View style={{marginHorizontal: 20, marginVertical: 20}}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
                source={{
                  uri: orderHistoryDetail?.type == "webinar" ?
                       imageurl + orderHistoryDetail?.get_webinar?.image
                       :orderHistoryDetail?.type == "expert" ?
                       imageurl + orderHistoryDetail?.get_expert?.image
                       :orderHistoryDetail?.type == "programs" ?
                       imageurl + orderHistoryDetail?.get_program?.image
                       :orderHistoryDetail?.type == "package" ?
                       imageurl + orderHistoryDetail?.get_package?.image
                       :orderHistoryDetail?.type == "magazine" ?
                       imageurl + orderHistoryDetail?.get_magazine?.file
                       :orderHistoryDetail?.type == "episode" ?
                       imageurl + orderHistoryDetail?.get_episode?.file
                       :null,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: fonts.OptimaDemiBold,
                  color: '#000',
                }}>
                {orderHistoryDetail?.type == "webinar" ?
                        orderHistoryDetail?.get_webinar?.title
                       :orderHistoryDetail?.type == "expert" ?
                        orderHistoryDetail?.get_expert?.title
                       :orderHistoryDetail?.type == "programs" ?
                       orderHistoryDetail?.get_program?.title
                       :orderHistoryDetail?.type == "package" ?
                       orderHistoryDetail?.get_package?.title
                       :orderHistoryDetail?.type == "magazine" ?
                       orderHistoryDetail?.get_magazine?.title
                       :orderHistoryDetail?.type == "episode" ?
                       orderHistoryDetail?.get_episode?.title
                       :null}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: colors.grayLight,
                borderBottomWidth: 2,
                marginHorizontal: 20,
                marginBottom: 20,
              }}
            />
            <View style={{marginHorizontal: 20, marginBottom: 20}}>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Type :{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.type}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Amount ₹ :{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.amount}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                GST % :{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.tax_percent}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Final Amount ₹ :{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.paid_amount}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Payment ID:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.payment_id}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Payment Date:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail?.created_at}
                </Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderHistoryDetail;
