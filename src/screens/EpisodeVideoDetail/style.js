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
        height: 30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -30,
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
})
export default styles;