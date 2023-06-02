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
    radiusView: {
        height: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -30,
    },
    backicon: {
        height: 32,
        width: 32,
        resizeMode: 'contain'
    },
    Colleaguestxt: {
        fontSize: 15,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
        color: colors.gray,
        textAlign: 'center',
    },
    Colleaguestxt2: {
        fontSize: 17,
        marginTop: 10,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        textAlign: 'center',
    },
    refaricon: {
        height: 122,
        width: 122,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 16
    },
    Refertxt: {
        bottom: 10,
        fontSize: 15,
        color: colors.black,
        fontWeight: '400',
        textAlign: 'center',
    },
    reffarborder: {
        width: '93%',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.reffarcolor,
        height: 45,
        borderStyle: 'dashed',
        borderRadius: 10 / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    abcd: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.reffarcolor,
        marginLeft: 7
    },
    taptocopy: {
        borderRadius: 10 / 2,
        left: 5,
        backgroundColor: colors.themeColor,
        height: 35,
        fontSize: 11,
        color: colors.black,
        fontWeight: '500',
        width: 78,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    Invitetxt: {
        fontSize: 15,
        color: colors.black,
        textAlign: 'center',
        marginTop: 60,
        fontWeight: '500'
    },
    touchflat: {
        alignItems: 'center',
        marginLeft: 15,
    },
    facebook_icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    appname: {
        fontSize: 12,
    },
    flatview: {
        paddingLeft: 10,
        marginTop: 20
    },
    webicon: {
        width: 43,
        height: 43,
        resizeMode: 'contain'
    },
    Gravid: {
        fontSize: 22,
        color: colors.black
    },
    wedview: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
    shareBtn: {
        backgroundColor: colors.themeColor,
        marginTop: 24,
        marginHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center"
    },
    shareBtnTxt: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
    },
})
export default styles;