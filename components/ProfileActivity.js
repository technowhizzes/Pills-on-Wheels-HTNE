import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import background from '../assets/background.jpg';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import logo from '../assets/logo.png';
import { Root } from "native-base";
import pill from '../assets/pill_logo.png';
import man from '../assets/man.png'
import prescription from '../assets/prescription_image.png';

class ProfileActivity extends React.Component {

    static navigationOptions = {
        title: '',
        headerLeft: null,
        headerStyle: {
            height: 0
        },
        headerShown: false

    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background_image} source={background}>
                    <Text style={styles.getstarted}>YOUR HOMEPAGE</Text>
                </ImageBackground>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity style={styles.customer} > 
                    <Text style={styles.customer_text}>ORDER PRESCRIPTION</Text>
                    <Image source={pill} style={styles.pill} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.account}>
                    <Text style={styles.account_text}>VIEW ACCOUNT</Text>
                    <Image source={man} style={styles.man} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.prescriptions}>
                    <Text style={styles.prescription_text}>VIEW PRESCRIPTIONS</Text>
                    <Image source={prescription} style={styles.prescription} />
                </TouchableOpacity>
                

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    background_image: {
        flex: 1,
        resizeMode: "cover",

    },
    logo: {
        position: "absolute",
        width: 180,
        height: 180,
        left: 110,
        top: -10
    },
    getstarted: {
        fontSize: 35,
        left: 60,
        fontWeight: "bold",
        textDecorationLine: 'underline',
        top: 160
    },
    customer: {
        position: 'absolute',
        top: 180,
        left: 20,
        width: 310,
        backgroundColor: "#fff",
        height: 60,
        justifyContent: "center",
        marginTop: 35,
        bottom: 10,
        marginLeft: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000'

        
    },
    customer_text: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 80,
        top: 20
    },

    account_text: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 100,
        top: 25
    },
    account: {
        position: 'absolute',
        top: 350,
        left: 20,
        width: 310,
        backgroundColor: "#fff",
        height: 60,
        justifyContent: "center",
        marginTop: 35,
        bottom: 10,
        marginLeft: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000'
 
    },
    pill: {
        width: 40,
        height: 40, 
        bottom: 15,
        left: 20

    },
    man: {
        width: 50,
        height: 50, 
        bottom: 15,
        left: 25
    },
    prescriptions: {
        position: 'absolute',
        top: 265,
        left: 20,
        width: 310,
        backgroundColor: "#fff",
        height: 60,
        justifyContent: "center",
        marginTop: 35,
        bottom: 10,
        marginLeft: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    prescription: {
        width: 40,
        height: 40, 
        bottom: 15,
        left: 20
    },
    prescription_text: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 80,
        top: 20
    }

});

export default ProfileActivity;