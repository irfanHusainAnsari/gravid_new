
import React from 'react';
import { Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, View } from 'react-native';
import { fonts, colors } from "@common";
const HomeHeader = ({ userData, navigation }) => {
    return (
        <View style={styles.child}>
            <TouchableOpacity
                style={{}}
                onPress={() => { navigation.navigate('Profile') }}>
                <Image style={styles.signupImg} source={userData?.profile ? { uri: imageurl + userData?.profile } : require('../assets/images/profileicon.png')} />
            </TouchableOpacity>
            <View style={styles.headingText}>
                <Text style={styles.hello}>{userData?.name} {userData?.lname}</Text>
            </View>
            <TouchableOpacity
                style={{ marginHorizontal: 5, padding: 8, borderRadius: 100 }}
                onPress={() => { navigation.navigate('Notifications') }}>
                <Image style={styles.notification} source={require('../assets/images/notification.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ borderRadius: 100 }}
                onPress={() => { navigation.navigate('Cart') }}>
                <Image style={styles.cart} source={require('../assets/images/cart.png')} />
            </TouchableOpacity>
            <View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    child: {
        alignItems: "center",
        marginHorizontal: 24,
        marginVertical: 20,
        flexDirection: "row",
    },
    signupImg: {
        width: 30,
        height: 30,
        resizeMode: "stretch",
        borderRadius: 100,
    },
    notification: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    cart: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    headingText: {
        marginLeft: 13,
        flex: 4

    },
    discount: {
        height: 100,
        width: 100,
        borderRadius: 20
    },
    hello: {
        fontFamily: fonts.OptimaBold,
        color: colors.grayRegular,
        fontSize: 16,
        // marginBottom: 20,
    },
    bookanddo: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 200,
        alignSelf: 'center'
    },
    userName: {
        fontSize: 20,
        color: colors.black,
        fontFamily: fonts.OptimaBold,
    },
});
export default HomeHeader;