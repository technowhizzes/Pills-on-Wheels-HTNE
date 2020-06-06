import React from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

class DriverVerifyScreen extends React.Component {

    goToLogin = async () => {
		this.props.navigation.navigate('DriverLoginScreen')
	}

	RegisterinDB = async () => {
		if (this.state.firstName && this.state.lastName && this.state.mobileNum.length == 10 && this.state.address && this.state.password.length > 7 && validator.isEmail(this.state.email)) {
			fetch('https://pillsonwheels.herokuapp.com/clientSignUp', {
				method: 'POST',
				headers: new Headers({
					"Accept": "application/json",
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(
					{ 'firstName': this.state.firstName, 'lastName': this.state.lastName, 'address': this.state.address, 'phoneNum': this.state.mobileNum, 'email': this.state.email, "password": this.state.password }),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});

			this.goToLogin
			this.props.navigation.navigate('ClientLoginScreen')
		} if (!this.state.password || !this.state.firstName || !this.state.lastName || !this.state.address || !this.state.mobileNum || !this.state.email) {
			Alert.alert(
				"Registration Failed",
				"Please ensure all fields are entered correctly.",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: false }
			);
		} if (this.state.password.length < 8) {
			Alert.alert(
				"Registration Failed",
				"Password must be more than 7 characters.",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
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
		firstName: "",
		lastName: "",
		address: "",
		email: "",
		mobileNum: "",
	};
	render() {
		console.log(this.state);

		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<Image
						source={require("../assets/logo.png")}
						style={styles.logo}
					/>
					<Text style={styles.text}>
						ENTER YOUR INFORMATION TO GET STARTED!
					</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="First Name"
							onChangeText={(text) =>
								this.setState({ firstName: text })
							}
							style={styles.input}
						/>
						<TextInput
							placeholder="Last Name"
							onChangeText={(text) =>
								this.setState({ lastName: text })
							}
							style={styles.input}
						/>
						<TextInput
							placeholder="Address"
							onChangeText={(text) =>
								this.setState({ address: text })
							}
							style={styles.input}
						/>
						<TextInput
							placeholder="Email Address"
							onChangeText={(text) =>
								this.setState({ email: text })
							}
							style={styles.input}
						/>
						<TextInput
							placeholder="Mobile Number"
							keyboardType={'phone-pad'}
							returnKeyType='done'
							onChangeText={(text) =>
								this.setState({ mobileNum: text })
							}
							style={styles.input}
						/>
					</View>
					<View style={styles.messageContainer}>
						<Text style={styles.message}>
							THIS INFORMATION HELPS US IN VERIFICATION AS WELL AS
							ALLOWING DRIVERS TO DELIVER STRAIGHT TO YOUR HOME
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DeliverHome')}>
						<Text
							style={{
								color: "white",
								fontSize: 17,
								fontWeight: "bold",
								
							}}
						>
							VERIFY MY ID
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default DriverVerifyScreen;

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		backgroundColor: "red",
		borderRadius: 6,
		height: 40,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		top: -10
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"

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
	messageContainer: {
		width: "90%",
		marginVertical: 10,
		// borderWidth: 1,
		borderRadius: 6,
		backgroundColor: "#B3D1FF",
		padding: 5,
		top: -20
	},
	message: {
		color: "white",
		fontWeight: "bold",
		fontSize: 17
	},
	text: {
		// borderWidth: 1,
		fontSize: 17,
		fontWeight: "bold",
		marginBottom: 10,
		top: -20
	},
	logo: {
		top: -10,
		width: 180,
		height: 180
	}
	
});
