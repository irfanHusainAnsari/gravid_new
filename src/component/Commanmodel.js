import React, { Component, useState } from 'react';
import { View, StyleSheet,Modal,ScrollView, Text } from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { WebView } from 'react-native-webview';

const Commanmodel = ({}) => {
    const [modalVisible,setModalVisible]=useState(true)
    return (
        <>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
            >
                <View style={{ backgroundColor: "white", borderRadius: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ position: "absolute", top: -34, left: -34 }}>
                            <Image source={require('../assets/images/Polygon-off.png')} style={styles.discount} />
                        </View>
                        <View style={{ position: "absolute", top: 0, left: 0 }}>
                            <Image source={require('../assets/images/off-text.png')} style={{ height: 40, width: 40 }} />
                        </View>
                        <View style={{ alignItems: "center", marginHorizontal: 20, marginTop: 10 }}>
                            <Image source={require('../assets/images/GRAVID_O.png')} style={{ height: 104, width: 104 }} />
                            <Text style={styles.offHadding}>Now Enjoy Reading the latest Gravid Readings on the app</Text>
                            <Text style={styles.offDes}>Subscribe to Gravid Digital & Get Unlimited Access anywhere , anytime.</Text>
                            <Text style={styles.offType}>Gravid Digital</Text>
                            <Image source={require('../assets/images/digital-reading.png')} style={styles.digitalReading} />
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => { setModalVisible(false) }}>
                            <Text style={styles.submitBtnTxt}>SUBMIT</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    discount: {
        height: 100,
        width: 100,
        borderRadius: 20
      },
    
    offHadding: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 5,
        textAlign: "center"
      },
      offDes: {
        fontFamily: fonts.OptimaBold,
        color: colors.gray,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 10,
        textAlign: "center"
      },
      offType: {
        fontFamily: fonts.OptimaBold,
        color: colors.lightblack,
        fontSize: 38,
        lineHeight: 24,
        textAlign: "center",
        marginTop: 5,
        lineHeight: 100
      },
    
     gravidTime: {
        height: 34,
        fontSize: 14,
        marginTop: 15,
        lineHeight: 24,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 0,
        color: colors.black,
        paddingHorizontal: 7,
        borderColor: "#D8D8D8",
        fontFamily: fonts.OptimaBold,
        width: 260, alignSelf: 'center',
      },
    
    priceView: {
        height: 34,
        marginTop: 6,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 45,
        flexDirection: "row",
        borderColor: "#D8D8D8",
        width: 260, alignSelf: 'center',
        // backgroundColor:'#fdfefe'
      },
    
    gravidPrice: {
        flex: 2,
        height: 34,
        paddingVertical: 0,
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 14,
      },
      gravidSelect: {
        flex: 1,
        height: 33,
        fontSize: 14,
        paddingVertical: 0,
        borderLeftWidth: 1,
        color: colors.black,
        textAlign: "center",
        borderLeftColor: "#D8D8D8",
        fontFamily: fonts.OptimaBold,
      },
      submitBtn: {
        height: 35,
        width: 178,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 40,
        paddingVertical: 9,
        alignSelf: "center",
        alignItems: 'center',
        borderColor: colors.themeColor,
      },
      submitBtnTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 14,
      }
})
export default Commanmodel