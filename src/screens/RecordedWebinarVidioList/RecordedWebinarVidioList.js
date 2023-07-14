import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { WebView } from 'react-native-webview';
import styles from './style';
import { svgs } from '../../common';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
const RecordedWebinarVidioList = ({ navigation, route }) => {
    const idvalue = route.params.item.id
    const [empty, setEmpty] = useState()
    const [episodeVideos, setEpisodeVideos] = useState([])

    useEffect(() => {
        PlayEpisodeVideo(idvalue)
    }, [])
    const PlayEpisodeVideo = () => {
        const params = {
            episode_id:idvalue,
        };
        Apis.EpisodeVideos(params).then(async json => {
            if (json.status == true) {
                if (json?.data?.length == 0) {
                    setEmpty("No episode vedio")
                }
                setEpisodeVideos(json?.data)
            }
        });
    }
    const renderVideos = ({ item }) => {
        return (

            <TouchableOpacity
                key={item.id}
                onPress={() =>
                    navigation.navigate('RecordedVideoDetail', {
                        item,
                    })
                }
                style={styles.NewsLetterView}>
                <Image source={{ uri: imageurl + item.file }} style={styles.newsImg} />
                <Image
                    style={styles.thembimg}
                    source={require("../../assets/images/playIcons.png")} />
                <View style={styles.paidType}>
                    <Text style={styles.paidTypeTxt}>{item.payment_type}</Text>
                </View>
                <View style={styles.newsleftView}>
                    <Text style={styles.issuetitle}>{item.title}</Text>
                    <Text style={styles.issueDes}>{item.short_description}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity
                    style={{ flex: 3 }}
                    onPress={() => navigation.goBack()}>
                    {svgs.backArrow('black', 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Recorded Video</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            {empty &&
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