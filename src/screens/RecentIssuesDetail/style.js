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
    },
    mainContainer: {
        flex: 1,
      },
      colorContainer: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: -30,
      },
      appointmentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      appointmentText: {
        color: '#6D7A90',
        fontSize: 14,
        marginBottom: 2,
        fontFamily:fonts.OptimaMedium,
      },
      one1Text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily:fonts.OptimaMedium,
      },
      localTimeText: {
        color: '#000',
        fontFamily:fonts.OptimaRegular
      },
      time: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
        fontFamily:fonts.OptimaBold
      },
      cancelImageCOntainer: {
        backgroundColor: '#FA8981',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        alignSelf: 'flex-end',
      },
      boderContainer: {
        borderWidth: 0.5,
        borderColor: '#E3E3E3',
        marginTop: 15,
        marginBottom: 10,
      },
      couponContainer: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        paddingHorizontal: 10,
        // paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:40,
      },
      couponCodeText: {
        color: '#000',
        fontSize: 15,
        fontFamily:fonts.OptimaBold
      },
      buttonApply: {
        backgroundColor: '#FA8981',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height:25,
      },
      buttonTitle: {
        color: '#000000',
        fontSize: 15,
        fontFamily:fonts.OptimaBold
      },
      buttonTitles: {
        color: '#000000',
        fontSize: 13,
        fontFamily:fonts.OptimaBold
      },
      subtotalContainers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      subtotalTitleText: {
        color: '#000',
        fontSize: 16,
        fontSize: 15,fontFamily:fonts.OptimaMedium
      },
      countButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FA8981',
        borderRadius:10,
        height: 45,
        marginTop: 10,
        paddingHorizontal: 10,
      },
      titleText: {
        fontFamily:fonts.OptimaMedium,
        color:"#000000"
      },
      buttonBookNow: {
        backgroundColor: '#FA8981',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
      },
})
export default styles;