/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { svgs } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import { useIsFocused } from '@react-navigation/native';

const CurrentIssue = (props) => {
  
  const isFocused = useIsFocused();
  const [term, setTerm] = useState(false)
  const [issuelist, setIssueList] = useState([])
  const [isLoader, setIsLoader] = useState(false)
  const handleTerm = () => {
    setTerm(!term)
  }

  useEffect(() => {
    // if (isFocused) {
      setIssueList([])
      HomeIssuedata()
    // }
  }, [])

  const HomeIssuedata = () => {
    setIsLoader(true)
    const params = {
              id: 1,
              type: 2
          }
    Apis.HomeDatalist(params)
      .then(async (json) => {
        console.log('IssuesList;;=====:', JSON.stringify(json));
        if (json.status == true) {
          setIssueList(json?.data?.issuelist?.data);
        }
        setIsLoader(false)
      }).catch((err) => {
        setIsLoader(false)
        console.log("IssuesList err : ", err);
      })
  }
  const renderItemNewsLetter = ({ item }) => {
    console.log('itemssssssss', item  )
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.NewsLetterView}
        onPress={() => props.navigation.navigate("RecentIssuesDetail", {item})}
      >
         
        <Image source={{ uri: imageurl + item.image }} style={styles.newsImg} />
        <View style={styles.newsleftView}>
        <View style={styles.isFreeView}>
            <Text style={styles.isFree}>{item.payment_type}</Text>
        </View>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
          <View style={styles.downloadmanview}>
            <TouchableOpacity style={styles.bkmrkBtn}>
              <View style={styles.bkmrkIcn}>
                <Image source={require('../../assets/images/read.png')}
                  style={{ height: 10, width: 10, resizeMode: 'contain' }} />
              </View>
              <Text style={styles.bkmrkBtnTxt}>Read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bkmrkBtn}>

              <View style={styles.bkmrkIcn}>
                {svgs.download("", 12, 12)}
              </View>
              <Text style={styles.bkmrkBtnTxt}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Recent Issues</Text>
        <View style={{ flex: 1, }} />
      </View>
      <View style={styles.borderview}>
        {
          isLoader ? (
            <View style={{ marginTop: 300 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              data={issuelist}
              numColumns={2}
              // style={{ paddingLeft: 24 }}
              renderItem={renderItemNewsLetter}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}

            />
          )
        }
      </View>

    </View>

  );
};

export default CurrentIssue;
