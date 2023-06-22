import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
// const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    haddingView: {
        backgroundColor: colors.themeColor,
        paddingTop: 16,
        paddingBottom: 40,
        flexDirection: "row",
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    haddingTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 18,
    },
    Webhandle: {
        left:"5%",width:"90%"
    },
    radiusView: {
        height: 50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -40,
    },
    backicon: {
        height: 32, width: 32, resizeMode: 'contain'
    },
    termstxt: {
        fontSize: 15, lineHeight: 25, color: colors.black,
        fontWeight: '500'
    },
})
export default styles;