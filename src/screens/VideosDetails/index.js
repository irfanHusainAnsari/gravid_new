import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import styles from './style';
import { svgs, colors } from '@common';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window')
import VideoPlayer from 'react-native-video-controls';
import CommonHeader from '../../component/CommonHeader';
import VideoPlay from '../../component/VideoPlay';
import LoaderRow from '../../component/LoaderRow';

const VideosDetails = (props) => {
    const videoDetail = props?.route?.params?.item;
    const [start, setStart] = useState(false)
    const [Fullscreen, setFullscreen] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 1000);
    }, [])
    console.log('videoDetailvideoDetailvideoDetail', imageurl + videoDetail.video)
    return (
        <View style={styles.container}>
            {Fullscreen ?null:
            <CommonHeader
                HeaderTitle={"Video"}
                navigation={() => props.navigation.goBack()}
            />}
            <View style={styles.radiusView} />
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                <View style={{
                    marginTop: -20,
                    borderWidth: 5,
                    borderColor: "white",
                    height:Fullscreen ?460: 300,
                    width: "100%",
                    alignSelf: "center",
                }}>
                    {start ?
                        <View style={styles.extraStyle}>
                            <VideoPlay
                                url={{ uri: imageurl + videoDetail.video, initOptions: ['--codec=avcodec'] }}
                                Fullscreen={(value) => { setFullscreen(value) }} />
                        </View>
                        :
                        <LoaderRow />
                    }
                    {/* <VideoPlayer
                         source={{ uri: imageurl + videoDetail.video, initOptions: ['--codec=avcodec'] }}
                        // source={{ uri: imageurl + 'public\vedio\Tusshar Kapoor 7th Cut.mov' }}
                        onPause={() => console.log("pause")}
                        onPlay={() => console.log("Play")}
                        // controls={true}
                        // paused={true}
                        navigator={props.navigator}
                        onError={err => console.log("err", err)}
                        style={{ width: width - 32, height: 200 }}
                    /> */}
                    {/* <ImageBackground source={{ uri: imageurl + videoDetail.image }} style={styles.imageBackgroundImage} >
                        <Image style={styles.playVideoIcons} source={require('../../assets/images/playIcons.png')} />
                    </ImageBackground> */}

                </View>
                <Text style={styles.CONTRIBUTORSTEXT}>{videoDetail.title}</Text>
                <Text style={styles.gravidDigestText}>{videoDetail.short_description}</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: videoDetail.description }}
                />
                {/* <Text style={styles.loremText}>{videoDetail.description}</Text> */}
            </ScrollView>
        </View>
    );
};

export default VideosDetails;