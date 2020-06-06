import React, { Component, useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import background from '../assets/background.jpg';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import logo from '../assets/logo.png';
import { Root } from "native-base";
import pill from '../assets/pill_logo.png';
import car from '../assets/car_logo.png'

var userId = "";
var prescriptionsJSON;

class ViewPrescriptions extends React.Component {


    RegisterinDB = async () => {
        

        fetch('https://pillsonwheels.herokuapp.com/getPrescriptions', {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(
                { 'id': userId }),
        })
            .then(response => response.json())
            .then(data => {
                prescriptionsJSON = data;


                // console.log(data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        //this.goToLogin
        this.props.navigation.navigate('ViewPrescriptionsScreen')
    }


    static navigationOptions = {
        title: " ",
        headerLeft: null,
        headerStyle: {
            height: 0,
        },
        headerShown: false,


    };


    render() {
        const itemId = this.props.navigation.getParam('id', 'NO-ID');
        userId = itemId;
        this.RegisterinDB()
        //this.drawPrescriptions();
        // var prescriptionNames = []

        // for (let i = 0; i < prescriptionsJSON[Object]["prescriptions"].length(); i++) {
        //     prescriptionNames.push(prescriptionsJSON[Object]["prescriptions"][i].name);
        // }

        // console.log(prescriptionNames);

        var fields = [];
        var currString;
        for (let i in prescriptionsJSON) {
            for (let j in prescriptionsJSON[i]) {
                for (let x in prescriptionsJSON[i][j]) {
                    currString = prescriptionsJSON[i][j][x];
                    //console.log(x)
                    //console.log(prescriptionsJSON[i][j][x])
                    if (x == "name") {
                        fields.push(
                            <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}>
                            </View>
                        )
                    }

                    if (x == "reps") {
                        fields.push (
                        <Text style={styles.med_info}>Refills: { currString }</Text>
                        )
                    }

                    if(x == "prescribingDoctor") {
                        fields.push (
                            <Text style={styles.med_info}>Prescribed By: { currString}</Text>
                        )
                    }

                    if(x == "name") {
                        fields.push (
                            <Text style={styles.med_info}>Medicine: { currString}</Text>
                        )
                    }

                    if(x == "number") {
                        fields.push (
                            <Text style={styles.med_info}>Prescription Number: { currString}</Text>
                        )
                    }

                    if(x == "dose") {
                        fields.push (
                            <Text style={styles.med_info}>Dose: { currString}</Text>
                        )
                    }
 
                }
            }
        }

        return (
            <View style={styles.container}>
                
                {fields}
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>YOUR PRESCRIPTIONS</Text>
                <TouchableOpacity style={styles.return} onPress={() => this.props.navigation.navigate('Profile')} >
                    <Text style={styles.return_text}>RETURN TO HOMPAGE</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('ClientAddPrescriptionScreen', { id: itemId })}>
                    <Text style={styles.add_text}>+ ADD               PRESCRIPTION</Text>

                </TouchableOpacity>

                <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                top: -380
                            }}>
                            </View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    data: {
        top: 0
    },
    logo: {
        position: "absolute",
        width: 100,
        height: 100,
        left: 20,
        top: 0
    },
    title: {
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        top: -400,
        left: 135
    },
    med_info: {
        fontSize: 18,
        fontWeight: 'bold',
        //top: -100,
        left: 150
    },
    return: {
        position: 'absolute',
        top: 525,
        left: -10,
        width: 175,
        backgroundColor: "#DC0F0F",
        height: 60,
        justifyContent: "center",
        marginTop: 35,
        bottom: 10,
        marginLeft: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000'


    },
    return_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        left: 15,
        top: 0
    },

    add_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        left: 15,
        top: 0
    },
    add: {
        position: 'absolute',
        top: 525,
        left: 190,
        width: 175,
        backgroundColor: "#DC0F0F",
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

export default ViewPrescriptions;