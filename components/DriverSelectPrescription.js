import React, { Component, useState } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	ImageBackground,
	Image,
	TouchableOpacity,
	FlatList,
} from "react-native";
import background from "../assets/background.jpg";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import logo from "../assets/logo.png";
import { Root } from "native-base";
import pill from "../assets/pill_logo.png";
import car from "../assets/car_logo.png";
import DriverPrescriptionCard from "./DriverPrescriptionCard";

var userId = "";
var prescriptionsJSON;

class DriverSelectPrescription extends React.Component {
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
		this.state = {};
		console.log("-==========================-");
	}

	RegisterinDB = async () => {
		fetch("https://pillsonwheels.herokuapp.com/availableDeliveries", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({ id: userId }),
		})
			.then((response) => response.json())
			.then((data) => {
				prescriptionsJSON = data;
				console.log("incoming: ", data);
				this.setState({ prescriptions: data.deliveries });
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		//this.goToLogin
		// this.props.navigation.navigate("ViewPrescriptionsScreen");
	};

	selectPrescription = async ({ item }) => {
		console.log("input:", {
			deliveryId: parseInt(item.id),
			driverId: parseInt(userId),
		});

		fetch("https://pillsonwheels.herokuapp.com/claimDelivery", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				deliveryId: parseInt(item.id),
				driverId: parseInt(userId),
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("incoming: ", data);
				if (data.status == 1) {
					this.props.navigation.navigate(
						"DriverDeliveryConfirmationScreen",
						{
							driverId: userId,
						}
					);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	componentDidMount() {
		this.RegisterinDB();
	}

	render() {
		const itemId = this.props.navigation.getParam("driverId", "NO-ID");
		userId = itemId;
		// console.log(this.state.prescriptions);

		console.log("current state: ", this.state);
		return (
			// <Text>apple</Text>
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require("../assets/logo.png")}
						style={{
							aspectRatio: 1,
							height: "100%",
							flex: 1,
						}}
					/>
					<Text
						style={{
							flex: 3,
							fontWeight: "bold",
							fontSize: 23,
						}}
					>
						DELIVERIES IN YOUR AREA
					</Text>
				</View>
				<View style={styles.body}>
					<FlatList
						data={this.state.prescriptions}
						renderItem={(item) => (
							<DriverPrescriptionCard
								data={item}
								onPress={() => this.selectPrescription(item)}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.props.navigation.pop(1)}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 24,
								color: "white",
							}}
						>
							Back
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		flex: 5,
		width: "100%",
	},
	button: {
		borderWidth: 2,
		borderRadius: 6,
		width: "60%",
		height: "40%",
		marginVertical: "1%",
		backgroundColor: "red",
		// justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default DriverSelectPrescription;
