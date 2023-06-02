import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import styles from './style';
import { svgs, colors } from '@common';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window')
import VideoPlayer from 'react-native-video-controls';

const VideosDetails = (props) => {
    const videoDetail = props?.route?.params?.item;
    console.log('videoDetailvideoDetailvideoDetail', videoDetail.video)
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Video</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop:-20,
                                borderWidth:5,
                                borderColor:"black",
                                height:290,
                                width:"90%",
                                alignSelf:"center",
                                }}>
     
                <VideoPlayer 
                            // source={{ uri: 'http://adminapp.gravidparenting.com/public/videos/Tusshar_Kapoor_7th.mp4' }}
                            source={{ uri: videoDetail?.video }}
                            controls={true}
                            paused={true} 
                            disableControlsAutoHide={true}
                            />
                    {/* <VideoPlayer
                        source={{ uri: imageurl + videoDetail.video, initOptions: ['--codec=avcodec'] }}
                        // source={{ uri: imageurl + 'public\vedio\Tusshar Kapoor 7th Cut.mov' }}
                        onPause={() => console.log("pause")}
                        onPlay={() => console.log("Play")}
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