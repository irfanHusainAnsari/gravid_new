import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { WebView } from 'react-native-webview';
import styles from './style';
import { svgs } from '../../common';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
const RecordedWebinarVidioList = ({ navigation, route }) => {
    const id = route.params.item.id
    const [empty, setEmpty] = useState()
    const [episodeVideos, setEpisodeVideos] = useState([])
    const [isLoader, setIsLoader] = useState(true)
    useEffect(() => {
        PlayEpisodeVideo(id)
    }, [])
    const PlayEpisodeVideo = (id) => {
        const params = {
            episode_id: id,
        };
        Apis.EpisodeVideos(params).then(async json => {
            if (json.status == true) {
                if (json?.data?.length == 0) {
                    setIsLoader(false)
                    setEmpty("No episode vedio")
                }
                setEpisodeVideos(json?.data)
            }
        });
    }
    const renderVideos = ({ item }) => {
        console.log("item=======================", item)
        return (
            <View
                style={styles.NewsLetterView}>
                <View>
                    <Image
                        style={styles.newsImg}
                        source={{ uri: imageurl + item.file }}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('RecordedVideoDetail', {
                            item,
                        })
                    }}>
                        <Image
                            style={styles.thembimg}
                            source={require("../../assets/images/playIcons.png")} />
                    </TouchableOpacity>
                    <Text style={styles.issuetitle}>{item.title}</Text>
                    <Text style={[styles.issuetitle, { fontSize: 11, color: "grey" }]}>{item.short_description}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity
                    style={{ flex: 4 }}
                    onPress={() => navigation.goBack()}>
                    {svgs.backArrow('black', 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Episode video</Text>
                <Text style={styles.haddingTxt}></Text>
                <View style={{ flex: 2 }} />
            </View>
            <View style={styles.radiusView} />

            {isLoader ?
                <View style={{ marginTop: 100 }}>
                    <ActivityIndicator size="large" />
                </View> :
                <Text style={styles.empty}>{empty}</Text>}
            <ScrollView style={{ alignSelf: "center" }}>
                <FlatList
                    data={
                        episodeVideos
                    }
                    numColumns={2}
                    renderItem={renderVideos}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );
}

export default RecordedWebinarVidioList