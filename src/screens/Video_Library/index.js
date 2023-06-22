
import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
import CommonHeader from '../../component/CommonHeader';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import LoaderRow from "../../component/LoaderRow"
const Video_Library = (props) => {
    const [videolist, setVideoList] = useState([])
    const [isLoader, setIsLoader] = useState(false)

    useEffect(() => {
        HomePagedata()
    }, [])

    const HomePagedata = () => {
        setIsLoader(true)
        Apis.HomePagedata({})
            .then(async (json) => {
                console.log('Video_Library=====:', JSON.stringify(json));
                if (json.status == true) {
                    setVideoList(json.data.expVedios.data);
                }
                setIsLoader(false)
            }).catch((error) => {
                console.log("Video_Library", error);
                setIsLoader(false)
            })
    }
    const renderItemvideo = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate("VideosDetails", { item })}
                style={styles.NewsLetterView2}>
                <Image source={{ uri: imageurl + item.image }} style={styles.newsImg} />
                <View style={styles.newsleftView}>
                    <View style={styles.bookanddo}>
                        <TouchableOpacity style={styles.bkmrkBtn}>
                            <View style={styles.bkmrkIcn}>
                                {svgs.bookmark("", 8, 8)}
                            </View>
                            <Text style={styles.bkmrkBtnTxt}>Bookmark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bkmrkBtn}>
                            <View style={styles.bkmrkIcn}>
                                {svgs.download("", 12, 12)}
                            </View>
                            <Text style={styles.bkmrkBtnTxt}>Download</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.issuetitle}>{item.title}</Text>
                    <Text style={styles.issueDes}>{item.short_description}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
             <CommonHeader
                HeaderTitle={"Video Library"}
                navigation={() => props.navigation.goBack()}
            />
            <View style={styles.borderview} />
            {
                isLoader ? (
                    <View style={{ marginTop: 300 }}>
                        <LoaderRow/>
                    </View>
                ) : (
                    <FlatList
                        data={videolist}
                        numColumns={2}
                        renderItem={renderItemvideo}
                        keyExtractor={(item) => item.id}
                    />
                )
            }
            {/* </View> */}
        </View>
    )
}
export default Video_Library