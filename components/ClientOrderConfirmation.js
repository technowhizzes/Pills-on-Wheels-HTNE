import React from "react";
import validator from 'validator';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";

var userId = "";
var medicine = "";
var prescription = "";
var pharmacyname = "";





class ClientOrderConfirmation extends React.Component {

    static navigationOptions = {
        title: ' ',
        headerLeft: null,
        headerStyle: {
            height: 0
        },
        headerShown: false


    };


    state = {
        pharmacyName: "",
        pharmacyAddress: ""
    };
    render() {
        const medName = this.props.navigation.getParam('name', 'NO-ID');
        const pharmacy = this.props.navigation.getParam('pharmacy', 'NO-ID');
        medicine = medName;
        pharmacyname = pharmacy;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                    />

                    <Text
                        style={{
                            flex: 3,
                            fontWeight: "bold",
                            fontSize: 23,
                            left: 0,
                            top: -60,
                            textDecorationLine: 'underline'
                        }}
                    >
                        ORDER CONFIRMATION
					</Text>

                    <Text
                        style={{
                            flex: 3,
                            fontWeight: "bold",
                            fontSize: 23,
                            left: 0,
                            top: 10,
                            
                        }}
                    >
                        YOU WILL RECEIVE A{"\n"}NOTIFICATION WHEN{"\n"}  THE DRIVER SETS{"\n"}  A DELIVERY TIME!
					</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.header}>PRESCRIPTION:</Text>
                        <Text style={styles.medicine}>{medicine}</Text>
                        <Text style={styles.address_header}>PHARMACY:</Text>
                        <Text style={styles.pharmacy}>{pharmacyname}</Text>
                    </View>
                    <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",

                            }}
                        >
                            RETURN TO HOMEPAGE
						</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ClientOrderConfirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"

    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -400,
        left: 110
    },
    medicine: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -400,
        left: 140,
    },
    address_header: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -375,
        left: 130
    },
    pharmacy: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -375,
        left: 150
    },
    button2: {
        borderWidth: 1,
        backgroundColor: "#DC0F0F",
        borderRadius: 6,
        height: 50,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        top: -150
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#D1D1D1",
        paddingHorizontal: 5,
        paddingVertical: 3,
        margin: 10,
        top: -100
    },
    input2: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#D1D1D1",
        paddingHorizontal: 5,
        paddingVertical: 3,
        margin: 10,
        top: -70
    },
    inputContainer: {
        // borderWidth: 1,
        width: "100%",
        // flex: 1,
    },
    text: {
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        top: -50,
        left: 50
    },
    logo: {
        width: 100,
        height: 100,
        left: 0,
        top: 550
    }

});
