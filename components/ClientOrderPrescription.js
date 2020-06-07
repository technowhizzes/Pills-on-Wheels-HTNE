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





class ClientOrderPrescription extends React.Component {

    sendtoDB = async () => {
        fetch("https://pillsonwheels.herokuapp.com/orderDelivery", {
            method: "POST",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({ "prescriptionId": prescription, "pharmacyName": this.state.pharmacyName, "pharmacyAddress": this.state.pharmacyAddress }),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        this.props.navigation.navigate("ClientOrderConfirmationScreen", { name: medicine, pharmacy: this.state.pharmacyAddress })
    }


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
        const itemId = this.props.navigation.getParam('id', 'NO-ID');
        const medName = this.props.navigation.getParam('name', 'NO-ID');
        const presId = this.props.navigation.getParam('prescripID', 'NO-ID');
        medicine = medName;
        prescription = presId;
        userId = itemId;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.header}>ENTER PHARMACY NAME:</Text>
                        <TextInput

                            onChangeText={(text) =>
                                this.setState({ pharmacyName: text })
                            }
                            style={styles.input}
                        />
                        <Text style={styles.address_header}>ENTER PHARMACY ADDRESS:</Text>
                        <TextInput

                            onChangeText={(text) =>
                                this.setState({ pharmacyAddress: text })
                            }
                            style={styles.input2}
                        />
                    </View>
                    <TouchableOpacity style={styles.button2} onPress={this.sendtoDB}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",

                            }}
                        >
                            PLACE ORDER
						</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("ChoosePrescriptionScreen", { id: itemId })} >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",

                            }}
                        >
                            CHOOSE PRESCRIPTION
						</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ClientOrderPrescription;

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
        top: -100,
        left: 60
    },
    address_header: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -70,
        left: 50
    },
    button: {
        borderWidth: 1,
        backgroundColor: "#DC0F0F",
        borderRadius: 6,
        height: 50,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        top: -100
    },
    button2: {
        borderWidth: 1,
        backgroundColor: "#DC0F0F",
        borderRadius: 6,
        height: 50,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        top: 40
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
        top: 380
    }

});
