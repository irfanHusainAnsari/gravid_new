import React from 'react';
import { Text, ActivityIndicator,TouchableOpacity, StyleSheet, View } from 'react-native';

const Button = props => {
    const {
        Buttontitle,
        buyIssuesText,
        mainButtonContainer,
        Onhandle
    } = props;
    return (
        <TouchableOpacity
            style={styles.buyIssuesButton}
            onPress={Onhandle}
        >
         <Text style={[styles.buyIssuesText, buyIssuesText]}>{Buttontitle}</Text>
        </TouchableOpacity>
        // <View style={[styles.mainButtonContainer,mainButtonContainer]}>
        //     <Text style={[styles.buyIssuesText, buyIssuesText]}>{Buttontitle}</Text>
        // </View>
    );
};
const styles = StyleSheet.create({
    buyIssuesText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 17,
    },
    buyIssuesButton: {
        backgroundColor: '#FE887E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        height: 43
    },
    mainButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Button;