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


class ClientOrderPrescription extends React.Component {

	// goToLogin = async () => {
	// 	this.props.navigation.navigate('ClientLoginScreen')
	// }

	// RegisterinDB = async () => {
    //     console.log(userId);
		
	// 		fetch('https://pillsonwheels.herokuapp.com/addPrescription', {
	// 			method: 'POST',
	// 			headers: new Headers({
	// 				"Accept": "application/json",
	// 				"Content-Type": "application/json"
	// 			}),
	// 			body: JSON.stringify(
	// 				{ 'id': userId, 'name': this.state.medicineName, 'doctor': this.state.doctor, 'dose': this.state.instructions, 'reps': this.state.refills, "number": this.state.prescriptionNumber }),
	// 		})
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log('Success:', data);
	// 			})
	// 			.catch((error) => {
	// 				console.error('Error:', error);
	// 			});

	// 		//this.goToLogin
	// 		this.props.navigation.navigate('ViewPrescriptionsScreen')
	// 	}

	static navigationOptions = {
		title: ' ',
		headerLeft: null,
		headerStyle: {
			height: 0
		},
		headerShown: false


	};


	state = {
		medicineName: "",
		doctor: "",
		prescriptionNumber: "",
		refills: "",
		instructions: "",
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
					<View style={styles.inputContainer}>
                        <Text style={styles.header}>ENTER PHARMACY NAME:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ medicineName: text })
							}
							style={styles.input}
						/>
                        <Text style={styles.address_header}>ENTER PHARMACY ADDRESS:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ doctor: text })
							}
							style={styles.input2}
						/>
					</View>
                    <TouchableOpacity style={styles.button2} onPress={this.RegisterinDB}>
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
                    <TouchableOpacity style={styles.button} onPress={this.RegisterinDB}>
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
        top: -200,
        left: 60
    },
    address_header: { 
        fontSize: 25,
        fontWeight: 'bold',
        top: -170,
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
		top: -140
    },
    button2: {
		borderWidth: 1,
		backgroundColor: "#DC0F0F",
		borderRadius: 6,
		height: 50,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		top: 20
    },
	input: {
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#D1D1D1",
		paddingHorizontal: 5,
		paddingVertical: 3,
		margin: 10,
		top: -200
    },
    input2: {
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#D1D1D1",
		paddingHorizontal: 5,
		paddingVertical: 3,
		margin: 10,
		top: -170
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
