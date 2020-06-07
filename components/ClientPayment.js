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


class ClientPayment extends React.Component {

    goBack = async () => {
        if (this.state.credit_card && this.state.cvv && this.state.expiry) {
            Alert.alert(
                'Payment Confirmation',
                'Your payment mehod has been configured.',
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate("OrderPrescriptionScreen")
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Invalid Payment',
                'Please ensure all fields are entered.',
                [
                    {
                        text: 'OK'
                    },
                ],
                { cancelable: false }
            );
        }
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
        credit_card: "",
        cvv: "",
        expiry: "",

    };
    render() {
        const itemId = this.props.navigation.getParam('id', 'NO-ID');
        userId = itemId;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.text}>
                        CONFIGURE PAYMENT
					</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.header}>CREDIT CARD NUMBER:</Text>
                        <TextInput

                            onChangeText={(text) =>
                                this.setState({ credit_card: text })
                            }
                            style={styles.input}
                        />
                        <Text style={styles.doctor_header}>CVV:</Text>
                        <TextInput

                            onChangeText={(text) =>
                                this.setState({ cvv: text })
                            }
                            style={styles.input}
                        />
                        <Text style={styles.expiry}>EXPIRY DATE:</Text>
                        <TextInput

                            onChangeText={(text) =>
                                this.setState({ expiry: text })
                            }
                            style={styles.input}
                        />

                    </View>
                    <TouchableOpacity style={styles.button2} onPress={this.goBack}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            FINISH
						</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ClientPayment;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        backgroundColor: "#DC0F0F",
        borderRadius: 6,
        height: 40,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        top: -20
    },
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
        left: 75
    },
    doctor_header: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -100,
        left: 175
    },
    expiry: {
        fontSize: 25,
        fontWeight: 'bold',
        top: -100,
        left: 125
    },
    button2: {
        borderWidth: 1,
        backgroundColor: "#DC0F0F",
        borderRadius: 6,
        height: 40,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        top: -5
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
    inputContainer: {
        // borderWidth: 1,
        width: "100%",
        // flex: 1,
    },
    text: {
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        top: -160,
        left: 50
    },
    logo: {
        width: 100,
        height: 100,
        left: -150,
        top: -100
    }

});
