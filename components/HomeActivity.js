import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import background from '../assets/background.jpg';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import logo from '../assets/logo.png';
import { Root } from "native-base";
import pill from '../assets/pill_logo.png';
import car from '../assets/car_logo.png'

class HomeActivity extends React.Component {

    static navigationOptions = {
        title: ' ',
        headerStyle: {
            height: 0
        },
        headerShown: false


    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background_image} source={background}>
                    <Text style={styles.getstarted}>GET STARTED AS A...</Text>
                </ImageBackground>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity style={styles.customer} onPress={() => this.props.navigation.navigate('ClientLoginScreen')} > 
                    <Text style={styles.customer_text}>CUSTOMER</Text>
                    <Image source={pill} style={styles.pill} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deliverer} onPress={() => this.props.navigation.navigate('DriverLoginScreen')}>
                    <Text style={styles.deliverer_text}>DRIVER</Text>
                    <Image source={car} style={styles.car} />
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
        left: 20,
        fontWeight: "bold",
        top: 160
    },
    customer: {
        position: 'absolute',
        top: 210,
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
        fontSize: 25,
        fontWeight: 'bold',
        left: 120,
        top: 25
    },

    deliverer_text: {
        fontSize: 25,
        fontWeight: 'bold',
        left: 150,
        top: 25
    },
    deliverer: {
        position: 'absolute',
        top: 320,
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
        width: 50,
        height: 50, 
        bottom: 15,
        left: 30

    },
    car: {
        width: 90,
        height: 50, 
        bottom: 15,
        left: 15
    }

});

export default HomeActivity;