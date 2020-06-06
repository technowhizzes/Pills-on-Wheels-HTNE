import React from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Image,
	TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class DriverAccount extends React.Component {
	static navigationOptions = {
		title: "",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	// state = {};

	constructor(props) {
		super(props);

		this.state = {
			driverId: this.props.navigation.getParam("driverId", "-1"),
		};
	}

	componentDidMount() {
		this.getInfoFromDb();
	}

	getInfoFromDb = async () => {
		let res = await fetch(
			"https://pillsonwheels.herokuapp.com/driverAccountInfo",
			{
				method: "POST",
				headers: new Headers({
					Accept: "application/json",
					"Content-Type": "application/json",
				}),
				body: JSON.stringify({
					id: this.state.driverId,
				}),
			}
		);
		let data = await res.json();
		this.setState({
			firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			email: data.email,
			mobileNum: data.phoneNum,
		});
		console.log(this.state);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require("../assets/logo.png")}
						style={{
							flex: 1,
							aspectRatio: 1,
							left: 30,
						}}
					/>
					<Text
						style={{
							flex: 3,
							fontWeight: "bold",
							fontSize: 25,
							textAlign: "center",
							textAlignVertical: "center",
						}}
					>
						YOUR ACCOUNT
					</Text>
				</View>
				<View style={styles.fields}>
					<View style={styles.field}>
						<Text style={styles.fieldText}>First Name:</Text>
						<Text style={styles.fieldInput}>
							{this.state.firstName}
						</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldText}>Last Name:</Text>
						<Text style={styles.fieldInput}>
							{this.state.lastName}
						</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldText}>Address:</Text>
						<Text style={styles.fieldInput}>
							{this.state.address}
						</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldText}>Email Address:</Text>
						<Text style={styles.fieldInput}>
							{this.state.email}
						</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldText}>Mobile:</Text>
						<Text style={styles.fieldInput}>
							{this.state.mobileNum}
						</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={styles.button}>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							CONFIGURE PAYMENT METHODS
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.props.navigation.pop(1)}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							RETURN
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default DriverAccount;

const styles = StyleSheet.create({
	button: {
		width: "70%",
		height: "20%",
		borderWidth: 1,
		borderRadius: 6,
		backgroundColor: "red",
		marginVertical: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	field: {
		flexDirection: "row",
		flex: 1,
		marginVertical: 10,
		alignContent: "space-between",
	},
	fieldInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: "grey",
		color: "grey",
		textAlignVertical: "center",
		textAlign: "center",
	},
	fields: {
		flex: 3,
		width: "100%",
		padding: 25,
	},
	fieldText: {
		flex: 1,
		textAlignVertical: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
	},
	footer: {
		flex: 2,
		borderWidth: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
	},
});
