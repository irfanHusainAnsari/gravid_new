import react, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { svgs, colors } from '@common';
import { WebView } from 'react-native-webview';
import { base_url, imageurl } from "../../Services/constants";
import CommonHeader from "../../component/CommonHeader";

const TermsCondition = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <CommonHeader HeaderTitle={"Terms & Conditions"} navigation={() =>navigation.goBack()} />
            <View style={styles.radiusView} />
            <WebView style={styles.Webhandle} source={{ uri: `${imageurl}terms-condition-app` }} />
        </View>
    )
}
export default TermsCondition 