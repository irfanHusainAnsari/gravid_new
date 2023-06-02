import react from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { svgs, colors } from '@common';
import { WebView } from 'react-native-webview';
import { base_url, imageurl } from "../../Services/constants";

const Privacy_Policy = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <View style={styles.haddingView}>
            <TouchableOpacity style={{ flex: 3 }} onPress={() => navigation.goBack()}>
                {svgs.backArrow("black", 24, 24)}
            </TouchableOpacity>
            <Text style={styles.haddingTxt}>Privacy Policy</Text>
            <View style={{ flex: 3 }} />
        </View>
        <View style={styles.radiusView} />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <WebView source={{ uri: `${imageurl}privacy-policy-app`}} />
        {/* </ScrollView> */}
    </View>
    )
}
export default Privacy_Policy 