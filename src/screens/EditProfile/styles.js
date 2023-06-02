import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        height: 50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -30,
    },
    backicon: {
        height: 32, width: 32, resizeMode: 'contain'
    },
    profileimg: {
        borderRadius: 100 / 2, alignSelf: 'center',
        width: 82, height: 82, resizeMode: 'contain', backgroundColor: '#dfdfdf'
        // height: hp(12), width: wp(22.5), resizeMode: 'contain',
        // alignSelf: 'center', borderRadius: 100 / 2
    },
    cameraman: {
        position: 'absolute', 
        borderRadius: 100 / 2,
        // right: 116, top: 20,
        top: hp(2), 
        right: wp(32)
    },
    cameraicon: {
        height: 30, 
        width: 30, 
        resizeMode: 'contain',
    },
    formInputView: {
        width: "90%",
        marginTop: 10,
        marginVertical: 8,
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 0.4,
        alignSelf: 'center',
        borderBottomColor: colors.grayRegular,

    },
    signupInput: {
        fontSize: 15,
        width: "90%",
        marginLeft: 10,
        color: '#929397',
        paddingVertical: 5,
        fontFamily: fonts.OptimaBold,
    },
    user_img: {
        height: 15, width: 15, resizeMode: 'contain'
    },
    signUpBtn: {
        height: 50,
        width: '90%',
        marginTop: 50,
        borderRadius: 100 / 1,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.themeColor,
    },
    signUpBtnTxt: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
    },
})
export default styles;