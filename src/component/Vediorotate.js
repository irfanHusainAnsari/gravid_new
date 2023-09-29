import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
import IMAGEPATH from '../common/ImagePath';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// import Loader from './Loader';
import Slider from '@react-native-community/slider';
import { imageurl } from '../Services/constants';
const windowHwidth = Dimensions.get('screen').width;

const Vediorotate = ({ toggleFullScreen, isFullScreen, VedioUrl, imageUri }) => {
    const [cachedVideoPath, setCachedVideoPath] = useState(null);
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [currentime, setCurrentime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [progress, setProgress] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const onVideoLoad = (data) => {
        setIsVideoLoaded(true);
        setDuration(data.duration)
    };
    const onProgress = (data) => {
        setCurrentime(data?.currentTime)
        setProgress(data?.currentTime)
    }
    useEffect(() => {
        const cacheFileName = VedioUrl;
        // Check if the video is already cached
        RNFetchBlob.fs.exists(`${RNFetchBlob.fs.dirs.CacheDir}/${cacheFileName}`).then((exists) => {
            if (exists) {
                setCachedVideoPath(`${RNFetchBlob.fs.dirs.CacheDir}/${cacheFileName}`);
            } else {
                // If the video is not cached, download and cache it
                downloadAndCacheVideo(VedioUrl, cacheFileName).then((path) => {
                    setCachedVideoPath(path);
                });
            }
        });
    }, [VedioUrl]);
    const downloadAndCacheVideo = async (url, cacheFileName) => {
        try {
            const { config, fs } = RNFetchBlob;
            const dirs = fs.dirs;
            const videoPath = `${dirs.CacheDir}/${cacheFileName}`;
            await config({
                fileCache: true,
                path: videoPath,
                appendExt: 'mp4',
            }).fetch('GET', url);
            return videoPath;
        } catch (error) {
            console.error('Error caching video:', error);
            return null;
        }
    };
    const pausedvedio = () => {
        setPlay(!play)
    }
    return (
        <View style={styles.container}>
            <Video
                onLoad={(data) => { onVideoLoad(data) }}
                onProgress={(data) => {
                    onProgress(data)
                }}
                repeat={true}
                muted={mute}
                paused={play}
                source={{ uri: cachedVideoPath }} // Replace with your video URL
                style={isFullScreen ? styles.fullScreenVideo : styles.video}
                resizeMode={isFullScreen ? "contain" : "contain"}
            />
            {!isVideoLoaded &&
                <View style={styles.video1}>
                    <Image
                        source={{ uri: imageurl + imageUri }}
                        style={styles.video1}
                        resizeMode="contain"
                    />
                    <ActivityIndicator size={"large"} style={{position:"absolute",alignSelf:"center",top:100}}/>
                </View>
            }
            <View style={isFullScreen ? styles.mainhandle1 : styles.mainhandle}>
                <View style={{ flexDirection: "row" ,paddingHorizontal:20}}>
                    <TouchableOpacity onPress={pausedvedio}>
                        <Image
                            style={[styles.imagesfullscreen]}
                            source={!play ? IMAGEPATH.pause : IMAGEPATH.play}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMute(!mute)} style={{ left: 20 }}>
                        <Image
                            style={[styles.imagesfullscreen]}
                            source={mute ? IMAGEPATH.mute : IMAGEPATH.unmute}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "60%" }}>
                    <Slider
                        style={{ width: "100%", height: responsiveHeight(2) }}
                        minimumValue={0}
                        maximumValue={duration}
                        value={progress}
                        onValueChange={(value) => {
                            console.log("value===============",value);
                            setProgress(value);
                        }}
                        minimumTrackTintColor="#FF5733"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#FF5733"
                    />
                </View>
                <TouchableOpacity onPress={toggleFullScreen} style={{paddingRight:20}}>
                    <Image
                        style={[styles.imagesfullscreen]}
                        source={IMAGEPATH.preview}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
    },
    mainhandle: {
        flexDirection: "row",
        width: "100%", height: "10%", position: 'absolute',
        justifyContent: "space-between",
        bottom: 20,
        left: 0,
        zIndex: 1,
    },
    mainhandle1: {
        flexDirection: "row",
        width: "100%", height: "10%", position: "relative",
        justifyContent: "space-between",
        bottom: 55,
        left: 0,
        zIndex: 1,
    },
    imagesfullscreen: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: "#000000"
    },
    video1: {
        width: '100%',
        height: "100%",
        position: 'absolute',
    },
    video: {
        width: '100%',
        height: "100%",
        marginTop: 10,
    },
    fullScreenVideo: {
        width: "100%",
        height: "45%",
    },
});
export default Vediorotate;
