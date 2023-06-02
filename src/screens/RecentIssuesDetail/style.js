import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
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
    radiusView: {
        height: 50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -30,
    },
    // backicon: {
    //     height: 32, width: 32, resizeMode: 'contain'
    // },
    // termstxt: {
    //     fontSize: 15, lineHeight: 25, color: colors.black,
    //     fontWeight: '500'
    // },
    ScreenshotImage: {
        resizeMode: "contain",
        width: '100%',
        height: 250,
        alignSelf: 'center'
    },
    gravidTitleText: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
    novemberText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#939393',
        marginTop: 5
    },
    buyIssuesButton: {
        backgroundColor: '#FE887E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        height: 43
    },
    buyIssuesText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 17,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width - 48,
        // height: 100,
    },
    downloadBtn: {
        backgroundColor: colors.themeColor,
        alignSelf: "flex-end",
        marginBottom: 24,
        marginRight: 24,
        padding: 6,
        borderRadius: 3
    },
    downloadBtnTxt: {
        fontFamily: fonts.OptimaRegular,
        color: colors.black,
        fontSize: 14,
    }
})
export default styles;