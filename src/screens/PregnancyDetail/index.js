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
import DatePicker from 'react-native-date-picker';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import CalendarStrip from 'react-native-calendar-strip';
import plus from '../../assets/images/plus.png';


const PregnancyDetail = props => {
  const totalWeek = props?.route?.params?.json?.totalWeek;
  const data = props?.route?.params?.json?.data;
  let colors = ['#88e374', '#abcdef', '#fdecba', '#123456'];
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="stretch"
        source={require('../../assets/images/preg_tracker.png')}>
        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 30, zIndex: 100}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>

        <CalendarStrip
          scrollable={true}
          iconStyle={{tintColor: '#ffffff'}}
          // iconLeft={require("../../assets/images/gravid-logo.png")}
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: colors.themeColor,
          }}
          style={{
            height: 100,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 40,
          }}
          calendarHeaderStyle={{color: colors.themeColor}}
          calendarColor={'transparent'}
          dateNumberStyle={{color: colors.themeColor}}
          dateNameStyle={{color: colors.themeColor}}
          highlightDateNumberStyle={{color: 'yellow'}}
          highlightDateNameStyle={{color: 'yellow'}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          // datesWhitelist={datesWhitelist}
          // datesBlacklist={datesBlacklist}
          // iconLeft={require('./img/left-arrow.png')}
          // iconRight={require('./img/right-arrow.png')}
          iconContainer={{flex: 0.1}}
        />
        <View style={{alignItems: 'center', marginTop: 0}}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: '#fcb8b8',
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 4,
              fontFamily: fonts.OptimaBold,
              color: '#ffffff',
            }}>
            Total week is {totalWeek}
          </Text>
        </View>

        <View style={{marginTop: 250, marginHorizontal: 20}}>
          <Text style={{fontSize: 16, fontFamily: fonts.OptimaBold}}>
            My daily insight
          </Text>
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <View
              style={{
                width: 100,
                height: 120,
                elevation: 5,
                backgroundColor: '#ffffff',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.OptimaDemiBold,
                  textAlign: 'center',
                  marginTop: 8,
                  lineHeight: 15,
                  flex: 1,
                }}>
                Log your symptoms
              </Text>
              <Image
                source={require('../../assets/images/plus.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 10,
                  flex: 1,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View
              style={{
                elevation: 5,
                backgroundColor: '#ffffff',
                borderRadius: 4,
                marginLeft: 3,
              }}>
              <FlatList
                data={data}
                renderItem={({item,index}) => (
                  <View style={{width: 100, height: 120}}>
                    <View style={{ flex: 1,backgroundColor: colors[index % colors.length],
                                   borderTopLeftRadius: 4,borderTopRightRadius:4
                       }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: fonts.OptimaDemiBold,
                        textAlign: 'center',
                        marginTop: 8,
                        lineHeight: 15,
                      }}>
                      {item.title}
                    </Text>
                    </View>
                   
                    <Image
                      source={{uri: imageurl + item.image}}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        flex: 1.2,
                        resizeMode: 'cover',
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        marginBottom: 5,
                      }}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PregnancyDetail;