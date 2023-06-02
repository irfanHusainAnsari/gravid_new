import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import styles from './style';
import { svgs, colors } from '@common';
import Apis from '../../Services/apis';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window')
import { imageurl } from '../../Services/constants';

const RecentOffersDetail = (props) => {
    
    const BlogDetail = props?.route?.params?.item
    // const [delail, setDetail] = useState();
    // useEffect(() => {
    //     HomePagedata();
    // }, [])

    // const HomePagedata = () => {
    //     const params = {
    //         id: BlogDetail.id,
    //         type: 1
    //     }
    //     Apis.HomeListsDetails(params)
    //         .then(async (json) => {
    //             console.log('Detail=====:', JSON.stringify(json))
    //             if (json.status == true) {
    //                 setDetail(json.data)
    //             }
    //         })
    // }

    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Offers</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Image style={styles.ScreenshotImage} source={{ uri: imageurl + BlogDetail.image }} />
                    <Text style={styles.CONTRIBUTORSTEXT}>{BlogDetail.title}</Text>
                    <Text style={styles.gravidDigestText}>{BlogDetail.short_description}</Text>
                </View>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: BlogDetail.description }}
                />
                {/* <Text style={styles.loremText}>{BlogDetail.description}</Text> */}
            </ScrollView>
        </View>
    );
};

export default RecentOffersDetail;