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
	Alert,
} from "react-native";

class DriverLogin extends React.Component {
	checkLogin = async () => {
		fetch("https://pillsonwheels.herokuapp.com/driverLogin", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const theJSON = data;
				if (theJSON["status"] == 1) {
					this.props.navigation.navigate("DeliverHome", {
						driverId: data.driverId,
					});
				}
				if (theJSON["status"] == 0) {
					if (theJSON["error"] == "Incorrect Password") {
						Alert.alert(
							"Login Failed",
							"The password you entered is incorrect",
							[
								{
									text: "OK",
									onPress: () => console.log("OK Pressed"),
								},
							],
							{ cancelable: false }
						);
					} else if (theJSON["error"] == "User does not exist") {
						Alert.alert(
							"Login Failed",
							"The email you entered does not exist.",
							[
								{
									text: "OK",
									onPress: () => console.log("OK Pressed"),
								},
							],
							{ cancelable: false }
						);
					}
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	static navigationOptions = {
		title: " ",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	state = {
		email: "",
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
					<Text style={styles.text}>LOGIN</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Email Address"
							onChangeText={(text) =>
								this.setState({ email: text })
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
					<TouchableOpacity
						style={styles.login}
						onPress={this.checkLogin}
					>
						<Text
							style={{
								color: "white",
								fontSize: 25,
								fontWeight: "bold",
							}}
						>
							LOGIN
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.register}
						onPress={() =>
							this.props.navigation.navigate("DriverVerify")
						}
					>
						<Text
							style={{
								color: "white",
								fontSize: 18,
								fontWeight: "bold",
							}}
						>
							NEED AN ACCOUNT? REGISTER HERE
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default DriverLogin;

const styles = StyleSheet.create({
	login: {
		borderWidth: 1,
		backgroundColor: "red",
		borderRadius: 6,
		height: 40,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		top: -50,
	},
	register: {
		borderWidth: 1,
		backgroundColor: "red",
		borderRadius: 6,
		height: 50,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		top: -30,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#D1D1D1",
		paddingHorizontal: 5,
		paddingVertical: 3,
		margin: 10,
		top: -80,
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
		top: -20,
	},
	message: {
		color: "white",
		fontWeight: "bold",
		fontSize: 17,
	},
	text: {
		// borderWidth: 1,
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 10,
		top: -80,
	},
	logo: {
		top: -80,
		width: 180,
		height: 180,
	},
});
