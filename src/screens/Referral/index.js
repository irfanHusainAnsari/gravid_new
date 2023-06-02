import react from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Linking,FlatList,Clipboard} from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import colors from "../../common/colors";
import styles from "./styles";
import { svgs, colors } from '@common';
import Share from 'react-native-share';

//http://gravidparenting.com/

const Referral = (props) => {
    const {refferalCode} = props?.route?.params
    console.log('propsReffralbbbbb', refferalCode)
    const Data = [
        { img: require('../../assets/images/facebook.png'), name: 'Facebook', color: colors.face },
        { img: require('../../assets/images/whatsapp.png'), name: 'Whatsapp', color: colors.what },
        { img: require('../../assets/images/instagram.png'), name: 'Instagram', color: colors.insta },
        { img: require('../../assets/images/linkedin.png'), name: 'Linkedin', color: colors.link },
        { img: require('../../assets/images/twitter.png'), name: 'Twitter', color: colors.twi },
    ]

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.touchflat}>
            <Image style={styles.facebook_icon}
                source={item.img}
            />
            <Text style={[styles.appname, { color: item.color }]}>{item.name}</Text>
        </TouchableOpacity>
    )

    const handleShare = async () => {
        const shareOptions = {
            message: "Gravid",
            title: 'Share file',
            url: "\n https://gravidparenting.com/",
            failOnCancel: false,
        };
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log('Result =>', ShareResponse);
            // setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            // setResult('error: '.concat(getErrorString(error)));
        }
    }

    const handleOpenWeb = () => {
        Linking.openURL("https://gravidparenting.com/")
    }

    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>My Referral</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                {/* <Text style={styles.Colleaguestxt}>You and Colleagues Will get</Text> */}
                <Text style={styles.Colleaguestxt2}>Refer a Friend to get 100 referral points</Text>
                <Image source={require('../../assets/images/refferral.png')}
                    style={styles.refaricon}
                />
                <Text style={styles.Refertxt}>Refer a friend</Text>
                <View style={styles.reffarborder}>
                    <Text style={styles.abcd}>{refferalCode}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => Clipboard.setString(refferalCode)}>
                        <Text style={styles.taptocopy}>Tap to copy</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.Invitetxt}>Invite your friends and get buzz points</Text>
                <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                    <Text style={styles.shareBtnTxt}>Share</Text>
                </TouchableOpacity>
                {/* <View style={styles.flatview}>
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        horizontal={true}
                    />
                </View> */}
            </ScrollView>
            <TouchableOpacity style={styles.wedview} activeOpacity={0.5} onPress={handleOpenWeb}>
                <Image
                    source={require('../../assets/images/web.png')}
                    style={styles.webicon}
                />
                <Text style={styles.Gravid}>www.gravidparenting.com</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Referral 