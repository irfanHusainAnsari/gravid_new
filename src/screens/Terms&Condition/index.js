import react, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { svgs, colors } from '@common';
import { WebView } from 'react-native-webview';
import { base_url, imageurl } from "../../Services/constants";

const TermsCondition = ({ navigation }) => {
 
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>Terms & Conditions</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            {/* <ScrollView style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}> */}
            {/* <WebView source={{ uri: "https://rasatva.apponedemo.top/gravid/terms-condition-app" }} /> */}
            <WebView source={{ uri: `${imageurl}terms-condition-app` }} />

            {/* </ScrollView> */}
        </View>
    )
}
export default TermsCondition 