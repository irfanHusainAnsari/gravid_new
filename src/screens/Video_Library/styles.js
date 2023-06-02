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
        alignItems: "center"
    },
    haddingTxt: {
        flex: 3,
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 20,
        textAlign: "center",
        lineHeight: 32
    },
    borderview: {
        backgroundColor: "white", paddingHorizontal: 6,
        paddingTop: 30, borderTopLeftRadius: 40, borderTopRightRadius: 40,
        marginTop: -30
    },
    NewsLetterView2: {
        backgroundColor: "#F9FAFC",
        // alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 10,
        // width:150
        width: width / 2 - 20,
        // height: 330,
    },
    newsImg: {
        width: width / 2 - 20,
        height: 130,
        borderRadius: 5,
        resizeMode: 'contain'
    },
    newsleftView: {
        paddingBottom: 12,
        marginTop: 5,
        marginHorizontal: 12,
    },
    bookanddo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bkmrkBtn: {
        flexDirection: "row",
        alignItems: "center"
    },
    bkmrkBtnTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 8,
        lineHeight: 17,
        marginLeft: 4,
    },
    bkmrkIcn: {
        backgroundColor: colors.white,
        padding: 6,
        borderRadius: 100
    },
    issuetitle: {
        marginTop: 10,
        lineHeight: 17,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
        fontSize: 13, alignSelf: 'center',
    },
    issueDes: {
        fontSize: 10,
        marginTop: 8,
        // lineHeight: 16,
        color: colors.gray,
        fontFamily: fonts.OptimaBold,
        alignSelf: 'center',
    },

});

export default styles;