import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Linking } from 'react-native';
import { svgs } from '@common';
import styles from './style';
import Swiper from 'react-native-swiper';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';

const Offers = (props) => {
  const adsense = props?.route?.params?.adsense;
  const offerlist = props?.route?.params?.offerlist
  console.log('offerlist', offerlist)
  const [blogslist, setBlogsList] = useState([])
  const [btmSlider, setBtmSlider] = useState([])
  const [isLoader, setIsLoader] = useState(false)
console.log('object', blogslist)
  useEffect(() => {
    HomeBlogdata()
  }, [])

  useEffect(() => {
    setBtmSlider(adsense)
  }, [adsense])

  const HomeBlogdata = () => {
    setIsLoader(true)
    const params = {
      id: 1,
      type: 4
    }
    Apis.HomeDatalist(params)
      .then(async (json) => {
        if (json.status == true) {
          console.log('offers:', json?.data?.offers);
          setBlogsList(json?.data?.offers?.data);
        }
        setIsLoader(false)
      }).catch((error) => {
        console.log("HomeDatalist", error);
        setIsLoader(false)
      })
  }

  const clinkOntype = async (item) => {
    if (item.offer_type === "webinar") {
      props.navigation.navigate("Webinar")
    }
    else if (item.offer_type === "episode") {
      props.navigation.navigate("Webinar", { offer_type: "record" })
    }
    else if (item.offer_type === "package") {
      props.navigation.navigate("Packages")
    }
    else if (item.offer_type === "program") {
      props.navigation.navigate("Programs")
    }
    else if (item.offer_type === "magzine") {
      props.navigation.navigate("CurrentIssue")
    }
    else if (item.offer_type == "parenting_tv") {
    //  props.navigation.navigate("ParentingList")
    }
    else if (item.offer_type === "expert") {
      props.navigation.navigate("ExpertList")
    }
  }

  const renderItemNewsLetter = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.NewsLetterView}
        // onPress={() => props.navigation.navigate("RecentOffersDetail", { item })}
        onPress={()=> clinkOntype(item)}
      >

        {/* <Text style={styles.issuetitle}>{item.title}</Text> */}
        {/* <View style={styles.newsleftView}> */}
          {/* <Text style={styles.issueDes}>{item.short_description}</Text> */}
          <Image source={{ uri: imageurl + item.image }} style={styles.newsImg} />
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  const handleOtherSlider = (url) => {
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>

      <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Recent Offers</Text>
        <View style={{ flex: 1, }} />
      </View>
      <View style={styles.manflatlistview}>
        {
          isLoader ? (
            <View style={{ marginTop: 300 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              data={offerlist}
              renderItem={renderItemNewsLetter}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListFooterComponent={() => {
                return (
                  <View style={styles.endView}>
                    <Swiper
                      activeDotStyle={{ backgroundColor: 'transparent', }}
                      dotStyle={{ backgroundColor: 'transparent', }}
                      autoplay={true}
                    >
                      {
                        btmSlider?.map((item) => {
                          return (
                            <TouchableOpacity key={item.id} onPress={item.slider_url ? () => handleOtherSlider(item.slider_url) : null}>
                              <Image key={item.id} style={styles.endImg} source={{ uri: imageurl + item.image }} />
                            </TouchableOpacity>
                          )
                        })
                      }
                    </Swiper>
                  </View>
                )
              }}
            />
          )
        }
      </View>

    </View>

  );
};

export default Offers;
