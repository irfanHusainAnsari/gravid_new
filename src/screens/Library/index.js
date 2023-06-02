/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { svgs, colors } from '@common';
import Modal from "react-native-modal";
import styles from './styles';
import Apis from '../../Services/apis';
import { useIsFocused } from '@react-navigation/native';
import { imageurl } from '../../Services/constants';
import Toast from 'react-native-simple-toast';

const Library = (props) => {
  const isFocused = useIsFocused();
  const { navigation } = props;
  const [type, setType] = useState("bookmark")
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [bookmarkDataList, setBookmarkDataList] = useState([])
  const [recordedList, setRecordedList] = useState([])
  const [removeBookmarkParams, setRemoveBookmarkParams] = useState({})
  const [isLoader, setIsLoader] = useState(false)
  const [isVideoLoader, setIsVideoLoader] = useState(false)

  useEffect(() => {
    if (isFocused) {
      bookmarkList()
      recordedVideo()
      deleteBookmark()
    }
  }, [isFocused, type])

  const bookmarkList = () => {
    setIsLoader(true)
    Apis.AllBookMark({})
      .then(async (json) => {
        console.log('AllBookMark=====:', JSON.stringify(json));
        if (json.status == true) {
          setBookmarkDataList(json.data);
        }
        setIsLoader(false)
      }).catch((err) => {
        setIsLoader(false)
        console.log("Bookmark err : ", err);
      })
  }

  const recordedVideo = () => {
    setIsVideoLoader(true)
    Apis.recordedVideo({})
      .then(async (json) => {
        console.log('recordedVideo=====:', JSON.stringify(json));
        if (json.status == true) {
          let newData = json?.data?.filter((item) => { return item?.check_payment })
          //  console.log("json.datajson.datajson.datajson.datajson.data" , newData)
          setRecordedList(newData);
        }
        setIsVideoLoader(false)
      }).catch((err) => {
        setIsVideoLoader(false)
        console.log("recordedVideo err : ", err);
      })
  }

  const handleWebinarType = (type) => {
    setType(type)
  }

  const handleDelete = (type, id) => {
    setRemoveBookmarkParams({ type, id })
    setConfirmDeleteModal(true)
  }

  const deleteBookmark = () => {
    Apis.AddBookmark(removeBookmarkParams)
      .then(async (json) => {
        console.log('bookmark success=====:', JSON.stringify(json));
        if (json.status == true) {
          setConfirmDeleteModal(false)
          Toast.show(json.message, Toast.LONG);
          bookmarkList()
        }
      })
  }

  const renderItemNewsLetter = ({ item }) => {
    return (
      <TouchableOpacity style={styles.NewsLetterView} onPress={item.type == "blog" ? () => props.navigation.navigate("RecentBlogsDetail", { item: item.blogs }) :
        item.type == "offer" ? () => props.navigation.navigate("RecentOffersDetail", { item: item.offer }) :
          () => props.navigation.navigate("RecentIssuesDetail", { item: { ...item.magzine, check_payment: item.check_payment } })}>
        <Image source={
          item.type == "blog" ? { uri: imageurl + item.blogs.image } :
          // item.type == "offer" ? { uri: imageurl + item.offer.image } :
            { uri: imageurl + item.magzine.image }} style={styles.newsImg} />
        <TouchableOpacity style={styles.wifiCon} onPress={() => handleDelete(item.type, item.type == "blog" ? item.blogs.id :
          item.type == "offer" ? item.offer.id :
            item.magzine.id)}>
          {svgs.deleteIcon(colors.white, 10, 10)}
        </TouchableOpacity>
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle} numberOfLines={2}>{item.type == "blog" ? item.blogs.title :
            // item.type == "offer" ? item.offer.title :
              item.magzine.title}</Text>
          <Text style={styles.issueDes} numberOfLines={3}>{item.type == "blog" ? item.blogs.short_description :
            // item.type == "offer" ? item.offer.short_description :
              item.magzine.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderVideos = ({ item }) => {
    return (
      <TouchableOpacity style={styles.NewsLetterView} onPress={() => props.navigation.navigate("RecordedVideoDetail", { item })}>
        <Image source={{ uri: imageurl + item.file }} style={styles.newsImg} />
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.issueDes} numberOfLines={3}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 3 }}
        >
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Library</Text>
        <View style={{ flex: 3 }} />
      </View> */}
      <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Library</Text>
                <View style={{ flex: 3 }} />
            </View>
      <View style={styles.radiusView} />
      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        <View style={styles.tabView}>
          <TouchableOpacity style={type == "bookmark" ? styles.WebinarActiveBtn : styles.WebinarInactiveBtn} onPress={() => handleWebinarType("bookmark")}>
            {
              type == "bookmark" ? (
                <>
                  <View style={styles.talkBubbleTriangleLeft} />
                  <View style={styles.talkBubbleTriangleRight} />
                </>
              ) : null
            }
            <Text style={type == "bookmark" ? styles.WebinarActiveBtnTxt : styles.WebinarInactiveBtnTxt}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={type == "video" ? styles.WebinarActiveBtn : styles.WebinarInactiveBtn} onPress={() => handleWebinarType("video")}>
            {
              type == "video" ? (
                <>
                  <View style={styles.talkBubbleTriangleLeft} />
                  <View style={styles.talkBubbleTriangleRight} />
                </>
              ) : null
            }
            <Text style={type == "video" ? styles.WebinarActiveBtnTxt : styles.WebinarInactiveBtnTxt}>Recorded videos</Text>
          </TouchableOpacity>
        </View>
        {
          isLoader && type == "bookmark" ? (
            <View style={{ marginTop: 250 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : isVideoLoader && type == "video" ? (
            <View style={{ marginTop: 250 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : type == "bookmark" ? (
            bookmarkDataList?.length > 0 ? (
              <FlatList
                data={bookmarkDataList}
                numColumns={2}
                style={{ paddingLeft: 16, marginTop: 40, flexDirection: "row" }}
                renderItem={renderItemNewsLetter}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text style={styles.noBookMarkTxt}>No bookmarks added</Text>
            )
          ) : type == "video" ? (
            <FlatList
              data={recordedList}
              numColumns={2}
              style={{ paddingLeft: 16, marginTop: 40, flexDirection: "row" }}
              renderItem={renderVideos}
              keyExtractor={(item) => item.id}
            />
          ) : null
        }

      </ScrollView>
      <Modal
        isVisible={confirmDeleteModal}
        onBackdropPress={() => setConfirmDeleteModal(false)}
        onBackButtonPress={() => setConfirmDeleteModal(false)}
      >
        <View style={{ backgroundColor: "white", borderRadius: 10, marginHorizontal: 40 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center", marginHorizontal: 20, marginTop: 10 }}>
              <Text style={styles.offHadding}>Are You sure to delete!</Text>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 30, justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setConfirmDeleteModal(false)}>
                <Text style={styles.cancelBtnTxt}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={deleteBookmark}>
                <Text style={styles.submitBtnTxt}>Yes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </View >

  );
};

export default Library;
