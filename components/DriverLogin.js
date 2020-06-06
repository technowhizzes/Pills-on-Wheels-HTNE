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
	static navigationOptions = {
		title: " ",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	state = {
		firstName: "",
		lastName: "",
		address: "",
		email: "",
		mobileNum: "",
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
								this.setState({ firstName: text })
							}
							style={styles.input}
						/>
						<TextInput
							placeholder="Password"
							secureTextEntry={true}
							onChangeText={(text) =>
								this.setState({ lastName: text })
							}
							style={styles.input}
						/>
					</View>
					<TouchableOpacity
						style={styles.login}
						onPress={() =>
							this.props.navigation.navigate("Profile")
						}
					>
						<Text
							style={{
								color: "white",
								fontSize: 25,
								fontWeight: "bold",
							}}
						>
							LOGIN PLEB
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
