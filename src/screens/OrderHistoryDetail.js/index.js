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
import Pdf from 'react-native-pdf';

const OrderHistoryDetail = props => {
  const currency = props?.route?.params?.currency;
  const Disc = props?.route?.params?.Disc;
  const profileImage = require('../../assets/images/profileicon.png');
  const orderId = props?.route?.params;
  const [isLoader, setIsLoader] = useState(false);
  const [orderHistoryDetail, setOrderHistoryDetail] = useState('');
  console.log('currency,Disc', currency,Disc);

  var date = new Date(orderHistoryDetail[0]?.created_at);
  var year_start = date.toLocaleString('default', {year: 'numeric'});
  var monthh_start = date.toLocaleString('default', {month: '2-digit'});
  var day_start = date.toLocaleString('default', {day: '2-digit'});

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

  const goToDetail = (item) => {
    console.log('objectitemitemitem', item)
    item.type == 'webinar'
      ? props.navigation.navigate("webinarDetail", { paid: item?.get_webinar })
      : item.type == 'program'
        ? props.navigation.navigate("ProgramsDetail", { paid: item?.get_program })
        : item.type == 'expert'
          ? props.navigation.navigate("ExpertListDetail", { item: item?.get_expert })
          : item.type == 'magzine'
            ? props.navigation.navigate("RecentIssuesDetail", { item: item?.get_magazine })
            : item.type == 'episode'
              ? props.navigation.navigate("RecordedWebinarVidioList", { item: item.get_episode })
              : item.type == 'package'
                ? props.navigation.navigate("NewPackegedetail", { paid: item?.get_package })
                : null
}






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
          <View style={{flex: 1}}>
           
            <View
              style={{
                backgroundColor: '#ffffff',
                marginBottom: 10,
                padding: 20,
                elevation: 2,
                margin: 3,
                borderRadius: 10,
              }}>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Payment ID:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {orderHistoryDetail[0]?.get_payment?.pay_id}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Payment Date:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {day_start}-{monthh_start}-{year_start}
                </Text>
              </Text>

              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Currency:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {currency}
                </Text>
              </Text>

              <Text style={{fontFamily: fonts.OptimaDemiBold, color: '#000'}}>
                Discount Amount:{' '}
                <Text
                  style={{
                    fontFamily: fonts.OptimaDemiBold,
                    color: colors.gray,
                  }}>
                  {Disc}
                </Text>
              </Text>


            </View>
            <FlatList
              data={orderHistoryDetail}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                var date = new Date(item?.created_at);
                var year_start = date.toLocaleString('default', {
                  year: 'numeric',
                });
                var monthh_start = date.toLocaleString('default', {
                  month: '2-digit',
                });
                var day_start = date.toLocaleString('default', {
                  day: '2-digit',
                });

                return (



                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      width: '98%',
                      borderRadius: 10,
                      elevation: 2,
                      marginBottom: 10,
                      margin: 3,
                      
                    }}>
                   <TouchableOpacity style={{flexDirection: 'row',}}  onPress={() => goToDetail(item)}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                      {item?.type == 'webinar' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={{uri: imageurl + item?.get_webinar?.image}}
                        />
                      ) : null}
                      {item?.type == 'expert' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={{uri: imageurl + item?.get_expert?.file}}
                        />
                      ) : null}
                      {item?.type == 'program' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={{uri: imageurl + item?.get_program?.image}}
                        />
                      ) : null}
                      {item?.type == 'package' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={{uri: imageurl + item?.get_package?.image}}
                        />
                      ) : null}
                      {item?.type == 'magzine' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={profileImage}
                        />
                      ) : null}
                      {item?.type == 'episode' ? (
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                          source={{uri: imageurl + item?.get_episode?.file}}
                        />
                      ) : null}
                      {/* <Image
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                        borderRadius: 100,
                      }}
                      
                      source={{
                        uri: item?.type == "webinar" ?
                             imageurl + item?.get_webinar?.image
                             :item?.type == "expert" ?
                             imageurl + item?.get_expert?.image
                             :item?.type == "program" ?
                             imageurl + item?.get_program?.image
                             :item?.type == "package" ?
                             imageurl + item?.get_package?.image
                             :item?.type == "magzine" ?
                             imageurl + item?.get_magazine?.file
                             :item?.type == "episode" ?
                             imageurl + item?.get_episode?.file
                             :null,
                      }}
                    /> */}
                    </View>
                    <View
                      style={{
                        borderLeftColor: colors.grayLight,
                        borderLeftWidth: 2,
                        // marginHorizontal: 20,
                        // marginBottom: 20,
                      }}
                    />
                    <View style={{marginHorizontal: 20, marginBottom: 20,flex:1}}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: fonts.OptimaDemiBold,
                          color: '#000',
                          // backgroundColor:"red"
                        }}>
                        {item?.type == 'webinar'
                          ? item?.get_webinar?.title
                          : item?.type == 'expert'
                          ? item?.get_expert?.name
                          : item?.type == 'program'
                          ? item?.get_program?.title
                          : item?.type == 'package'
                          ? item?.get_package?.title
                          : item?.type == 'magzine'
                          ? item?.get_magazine?.title
                          : item?.type == 'episode'
                          ? item?.get_episode?.title
                          : null}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.OptimaDemiBold,
                          color: '#000',
                        }}>
                        Type :{' '}
                        <Text
                          style={{
                            fontFamily: fonts.OptimaDemiBold,
                            color: colors.gray,
                          }}>
                          {item?.type}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.OptimaDemiBold,
                          color: '#000',
                        }}>
                        Amount ₹ :{' '}
                        <Text
                          style={{
                            fontFamily: fonts.OptimaDemiBold,
                            color: colors.gray,
                          }}>
                          {item?.amount}
                        </Text>
                      </Text>
                    </View>
                    </TouchableOpacity>
                  </View>




                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderHistoryDetail;
