import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    haddingView: {
        backgroundColor: colors.themeColor,
    },
    haddingTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 18,
        marginVertical:10,
        alignSelf:"center"
    },
    radiusView: {
        height: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -40,
    },
    backgroundVideo: {
        flex:0.5,
        paddingHorizontal:"2%",
        paddingVertical:"2%"
      },
      extraStyle:{
        flex:1,
        paddingHorizontal:"2%",
        paddingVertical:"2%"
      }
})
export default styles;