import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";

class DriverPayment extends React.Component {
	static navigationOptions = {
		title: "",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			email: "",
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require("../assets/logo.png")}
						style={{ height: "100%", aspectRatio: 1 }}
					/>
				</View>
				<View style={styles.fields}>
					<Text style={styles.fieldText}>
						ENTER YOUR PAYPAL EMAIL
					</Text>
					<TextInput
						style={styles.fieldInput}
						placeholder="PayPal Email"
						onChangeText={(val) => this.setState({ email: val })}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 22,
								color: "white",
							}}
						>
							SUBMIT
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default DriverPayment;

const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
		borderRadius: 6,
		height: "17%",
		width: "60%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "red",
	},
	buttonContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fieldInput: {
		borderWidth: 2,
		width: "80%",
		height: "15%",
		borderRadius: 6,
		marginVertical: 20,
		paddingHorizontal: 7,
	},
	fields: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	fieldText: {
		marginVertical: 20,
		fontWeight: "bold",
		fontSize: 18,
	},
	header: {
		flex: 0.4,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
