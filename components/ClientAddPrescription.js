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


class ClientAddPrescription extends React.Component {

	// goToLogin = async () => {
	// 	this.props.navigation.navigate('ClientLoginScreen')
	// }

	RegisterinDB = async () => {
        console.log(userId);
		
			fetch('https://pillsonwheels.herokuapp.com/addPrescription', {
				method: 'POST',
				headers: new Headers({
					"Accept": "application/json",
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(
					{ 'id': userId, 'name': this.state.medicineName, 'doctor': this.state.doctor, 'dose': this.state.instructions, 'reps': this.state.refills, "number": this.state.prescriptionNumber }),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});

			//this.goToLogin
			this.props.navigation.navigate('Profile')
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
					<Text style={styles.text}>
						ADD PRESCRIPTION
					</Text>
					<View style={styles.inputContainer}>
                        <Text style={styles.header}>MEDICINE NAME:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ medicineName: text })
							}
							style={styles.input}
						/>
                        <Text style={styles.doctor_header}>PRESCRIBING DOCTOR:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ doctor: text })
							}
							style={styles.input}
						/>
                        <Text style={styles.doctor_header}>PRESCRIPTION NUMBER:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ prescriptionNumber: text })
							}
							style={styles.input}
						/>
                        <Text style={styles.doctor_header}>NUMBER OF REFILLS:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ refills: text })
							}
							style={styles.input}
						/>
                        <Text style={styles.doctor_header}>DOSAGE INSTRUCTIONS:</Text>
						<TextInput
							
							onChangeText={(text) =>
								this.setState({ instructions: text })
							}
							style={styles.input}
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
							FINISH
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default ClientAddPrescription;

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		backgroundColor: "red",
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
        top: -20,
        left: 100
    },
    doctor_header: { 
        fontSize: 25,
        fontWeight: 'bold',
        top: -20,
        left: 70
    },
    button2: {
		borderWidth: 1,
		backgroundColor: "red",
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
		top: -20
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
        left: -150,
        top: 0
	}

});
