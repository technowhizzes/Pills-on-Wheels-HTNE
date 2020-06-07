import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";

class DriverDeliveryConfirmation extends React.Component {
	static navigationOptions = {
		title: " ",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			driverId: this.props.navigation.getParam("driverId", "NO-ID"),
		};
		console.log("-===================================-");
	}

	getDeliveries = async (driverId) => {
		fetch("https://pillsonwheels.herokuapp.com/claimedDeliveries", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({ driverId: driverId }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("incoming: ", data);
				if (data.deliveries) {
					this.setState(data.deliveries[0]);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	closeDelivery = async (deliveryId) => {
		fetch("https://pillsonwheels.herokuapp.com/completeDelivery", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({ deliveryId: deliveryId }),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log("incoming: ", data);
				this.props.navigation.navigate("DeliverHome", {
					driverId: this.state.driverId,
				});
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	componentDidMount() {
		this.getDeliveries(this.state.driverId);
	}

	render() {
		console.log("current state: ", this.state);

		return (
			<View style={styles.container}>
				{/* <Text onPress={() => this.closeDelivery(1)}>
					close delivery
				</Text> */}
				<Text style={styles.textHeader}>Pharmacy Address:</Text>
				<TextInput
					value={this.state.pharmacyAddress}
					style={styles.textValue}
				/>
				<Text style={styles.textHeader}>Pharmacy Name:</Text>
				<TextInput
					value={this.state.pharmacyName}
					style={styles.textValue}
				/>
				<Text style={styles.textHeader}>Deliver to Address:</Text>
				<TextInput
					value={this.state.clientAddress}
					style={styles.textValue}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.closeDelivery(this.state.id)}
				>
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: 15,
						}}
					>
						COMPLETED DELIVERY
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default DriverDeliveryConfirmation;

const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
		borderRadius: 8,
		backgroundColor: "red",
		width: "60%",
		height: "7%",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	textHeader: {
		fontWeight: "bold",
		fontSize: 25,
	},
	textValue: {
		borderWidth: 2,
		borderRadius: 6,
		borderColor: "gray",
		padding: 10,
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 16,
	},
});
