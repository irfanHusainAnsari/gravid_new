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
import {styles} from './style';
import Apis from '../../Services/apis';
import fonts from '../../common/fonts';
import { useIsFocused } from '@react-navigation/native';

const OrderHistory = props => {
  const isFocused = useIsFocused();
  const [isLoader, setIsLoader] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState('');
  console.log('orderHistoryData', orderHistoryData);
  // var date = new Date(date);
  // var year = date.toLocaleString('default', {year: 'numeric'});
  // var monthh = date.toLocaleString('default', {month: '2-digit'});
  // var day = date.toLocaleString('default', {day: '2-digit'});
  // var formattedDate = day + '/' + monthh + '/' + year;
  // var newFormateDate = year+"-" + monthh +"-"+day

  useEffect(() => {
    getOrderHistoryData();
  }, [isFocused]);

  const getOrderHistoryData = () => {
    setIsLoader(true);
    Apis.getOrderHistory({})
      .then(async json => {
        console.log('getOrderHistoryData', json);
        if (json.status == true) {
          setOrderHistoryData(json?.data);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const getOrderDetail = (id) => {
        props.navigation.navigate("OrderHistoryDetail",{id})
  }
  
  const OrderHistoryData = ({item}) => {
    var date = new Date(item?.created_at);
    var year = date.toLocaleString('default', {year: 'numeric'});
    var monthh = date.toLocaleString('default', {month: '2-digit'});
    var day = date.toLocaleString('default', {day: '2-digit'});
    var hours = date.getHours('default', {day: '2-digit'});
    var minuts = date.getMinutes('default', {day: '2-digit'});
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    var formattedDate = day + '/' + monthh + '/' + year;

    return (
      <View
        style={styles.cardColorContainer}>
        <View style={styles.imageCard}>
          <TouchableOpacity style={styles.notificationsImageContainer} onPress={() => getOrderDetail(item?.id)}>
            <Image
              style={styles.notificationsImage}
              source={require('../../assets/images/eye.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.notificationsText}>
          <Text style={styles.textNotificationColor}>
            User:{' '}
            <Text style={styles.textTimeNotificationcolor}>
              {item?.user_data.name}
            </Text>
          </Text>
          <Text style={styles.textNotificationColor}>
            Email:{' '}
            <Text style={styles.textTimeNotificationcolor}>
              {item?.user_data?.email}
            </Text>
          </Text>
          <Text style={styles.textNotificationColor}>
            Payment Id :{' '}
            <Text style={styles.textTimeNotificationcolor}>{item?.pay_id}</Text>
          </Text>
          <Text style={styles.textNotificationColor}>
            Status :{' '}
            <Text style={styles.textTimeNotificationcolor}>
              {item?.rozerpay_status}
            </Text>
          </Text>
          <Text style={styles.textNotificationColor}>
            Currency :{' '}
            <Text style={styles.textTimeNotificationcolor}>
              {item?.currency}
            </Text>
            <Text style={styles.textNotificationColor}>
              {' '}
              Amount :{' '}
              <Text style={styles.textTimeNotificationcolor}>
                {item?.amount}
              </Text>
            </Text>
          </Text>
          <Text style={{fontFamily: fonts.OptimaMedium, fontSize: 12}}>
            {formattedDate} {hours}:{minutes} {ampm}
          </Text>
        </View>
      </View>
    );
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
          <Text style={styles.headerTitle}>Order History</Text>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={orderHistoryData}
              keyExtractor={item => item.id}
              renderItem={OrderHistoryData}
              ItemSeparatorComponent={() => (
                <View style={{borderWidth: 0.3, borderColor: '#ccc'}} />
              )}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default OrderHistory;
