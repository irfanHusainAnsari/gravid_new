import react from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { svgs, colors } from '@common';
import { WebView } from 'react-native-webview';
import { base_url, imageurl } from "../../Services/constants";
import CommonHeader from "../../component/CommonHeader";

const Privacy_Policy = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CommonHeader HeaderTitle={"Privacy Policy"} navigation={() => navigation.goBack()} />
            <View style={styles.radiusView} />
            <WebView style={styles.webhandle} source={{ uri: `${imageurl}privacy-policy-app` }} />
        </View>
    )
}
export default Privacy_Policy 