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
        marginTop: -40,
    },
    ScreenshotImage: {
        width:"100%",
        height: 230,
        borderRadius: 20,
        resizeMode: "contain",
        alignSelf: 'center',
       
    },
        contributorText: {
        position:"relative",
        marginTop: -30,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        left:10,
        marginBottom:10
       
    },
    gravidDigestText: {
        fontSize: 16,
        color: '#808080',
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
    loremText: {
        marginTop: 30,
        lineHeight: 18,
        color: '#929397'
    },
    bookNowBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.themeColor,
        paddingVertical: 12,
        marginBottom: 24,
        borderRadius: 6
    },
    bookNowBtnTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 18,
    },
    joinWebinarBtn: {
        backgroundColor: colors.themeColor,
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
        borderRadius: 5,
      },
      joinWebinarBtnTxt: {
        fontFamily: fonts.OptimaMedium,
        color: colors.black,
        fontSize: 20,
        paddingVertical: 14,
        alignSelf:"center"
      },
      datetext:{
        marginHorizontal:25,
        fontFamily:fonts.OptimaBold,
        fontSize:16,
        color: colors.black,
        marginBottom:15,
      },
})
export default styles;