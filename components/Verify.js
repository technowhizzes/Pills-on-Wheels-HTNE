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


class VerifyScreen extends React.Component {

	goToLogin = async () => {
		this.props.navigation.navigate('ClientLoginScreen')
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
		} else {
			Alert.alert(
				"Registration Failed",
				"Please ensure all fields are entered correctly and password length is greater than 7 characters.",
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
		password: "",
	};
	render() {
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

						<TextInput
							placeholder="Password"
							secureTextEntry={true}
							onChangeText={(text) =>
								this.setState({ password: text })
							}
							style={styles.input}
						/>
					</View>
					<TouchableOpacity style={styles.button} onPress={this.RegisterinDB}>
						<Text
							style={{
								color: "white",
								fontSize: 20,
								fontWeight: "bold",


							}}
						>
							REGISTER
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default VerifyScreen;

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		backgroundColor: "#DC0F0F",
		borderRadius: 6,
		height: 40,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		top: -30
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
		top: -50
	},
	inputContainer: {
		// borderWidth: 1,
		width: "100%",
		// flex: 1,
	},
	text: {
		// borderWidth: 1,
		fontSize: 17,
		fontWeight: "bold",
		marginBottom: 10,
		top: -50
	},
	logo: {
		top: -40,
		width: 180,
		height: 180
	}

});
