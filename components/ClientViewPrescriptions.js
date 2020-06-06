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
import PrescriptionCard from "./PrescriptionCard";

var userId = "";
var prescriptionsJSON;

class ViewPrescriptions extends React.Component {
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
	}

	RegisterinDB = async () => {
		fetch("https://pillsonwheels.herokuapp.com/getPrescriptions", {
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
				this.setState({ prescriptions: data.prescriptions });
				// console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		//this.goToLogin
		this.props.navigation.navigate("ViewPrescriptionsScreen");
	};

	componentDidMount() {
		this.RegisterinDB();
	}

	render() {
		const itemId = this.props.navigation.getParam("id", "NO-ID");
		userId = itemId;
		//this.drawPrescriptions();
		// var prescriptionNames = []

		// for (let i = 0; i < prescriptionsJSON[Object]["prescriptions"].length(); i++) {
		//     prescriptionNames.push(prescriptionsJSON[Object]["prescriptions"][i].name);
		// }

		// console.log(prescriptionNames);

		// START OF OLD CODE =======================================================
		// var fields = [];
		// var currString;
		// for (let i in prescriptionsJSON) {
		// 	for (let j in prescriptionsJSON[i]) {
		// 		for (let x in prescriptionsJSON[i][j]) {
		// 			currString = prescriptionsJSON[i][j][x];
		// 			//console.log(x)
		// 			//console.log(prescriptionsJSON[i][j][x])
		// 			if (x == "name") {
		// 				fields.push(
		// 					<View
		// 						style={{
		// 							borderBottomColor: "black",
		// 							borderBottomWidth: 1,
		// 						}}
		// 					></View>
		// 				);
		// 			}

		// 			if (x == "reps") {
		// 				fields.push(
		// 					<Text style={styles.med_info}>
		// 						Refills: {currString}
		// 					</Text>
		// 				);
		// 			}

		// 			if (x == "prescribingDoctor") {
		// 				fields.push(
		// 					<Text style={styles.med_info}>
		// 						Prescribed By: {currString}
		// 					</Text>
		// 				);
		// 			}

		// 			if (x == "name") {
		// 				fields.push(
		// 					<Text style={styles.med_info}>
		// 						Medicine: {currString}
		// 					</Text>
		// 				);
		// 			}

		// 			if (x == "number") {
		// 				fields.push(
		// 					<Text style={styles.med_info}>
		// 						Prescription Number: {currString}
		// 					</Text>
		// 				);
		// 			}

		// 			if (x == "dose") {
		// 				fields.push(
		// 					<Text style={styles.med_info}>
		// 						Dose: {currString}
		// 					</Text>
		// 				);
		// 			}
		// 		}
		// 	}
		// }

		// return (
		// 	<View style={styles.container}>
		// 		{fields}
		// 		<Image source={logo} style={styles.logo} />
		// 		<Text style={styles.title}>YOUR PRESCRIPTIONS</Text>
		// 		<TouchableOpacity
		// 			style={styles.return}
		// 			onPress={() => this.props.navigation.navigate("Profile")}
		// 		>
		// 			<Text style={styles.return_text}>RETURN TO HOMPAGE</Text>
		// 		</TouchableOpacity>
		// 		<TouchableOpacity
		// 			style={styles.add}
		// 			onPress={() =>
		// 				this.props.navigation.navigate(
		// 					"ClientAddPrescriptionScreen",
		// 					{ id: itemId }
		// 				)
		// 			}
		// 		>
		// 			<Text style={styles.add_text}>+ ADD PRESCRIPTION</Text>
		// 		</TouchableOpacity>

		// 		<View
		// 			style={{
		// 				borderBottomColor: "black",
		// 				borderBottomWidth: 1,
		// 				top: -380,
		// 			}}
		// 		></View>
		// 	</View>
		// );
		// END OF OLD CODE ===========================================================

		console.log(this.state.prescriptions);

		return (
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
						renderItem={(item) => <PrescriptionCard data={item} />}
					/>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() =>
							this.props.navigation.navigate(
								"ClientAddPrescriptionScreen",
								{ id: itemId }
							)
						}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
								color: "white",
							}}
						>
							+ ADD PRESCRIPTION
						</Text>
					</TouchableOpacity>
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
		borderWidth: 1,
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

	// container: {
	// 	flex: 1,
	// 	justifyContent: "center",
	// },
	// data: {
	// 	top: 0,
	// },
	// logo: {
	// 	position: "absolute",
	// 	width: 100,
	// 	height: 100,
	// 	left: 20,
	// 	top: 0,
	// },
	// title: {
	// 	fontSize: 25,
	// 	textDecorationLine: "underline",
	// 	fontWeight: "bold",
	// 	top: -400,
	// 	left: 135,
	// },
	// med_info: {
	// 	fontSize: 18,
	// 	fontWeight: "bold",
	// 	//top: -100,
	// 	left: 150,
	// },
	// return: {
	// 	position: "absolute",
	// 	top: 525,
	// 	left: -10,
	// 	width: 175,
	// 	backgroundColor: "#DC0F0F",
	// 	height: 60,
	// 	justifyContent: "center",
	// 	marginTop: 35,
	// 	bottom: 10,
	// 	marginLeft: 30,
	// 	borderRadius: 10,
	// 	borderWidth: 1,
	// 	borderColor: "#000000",
	// },
	// return_text: {
	// 	color: "#fff",
	// 	fontSize: 20,
	// 	fontWeight: "bold",
	// 	left: 15,
	// 	top: 0,
	// },
	// add_text: {
	// 	color: "#fff",
	// 	fontSize: 20,
	// 	fontWeight: "bold",
	// 	left: 15,
	// 	top: 0,
	// },
	// add: {
	// 	position: "absolute",
	// 	top: 525,
	// 	left: 190,
	// 	width: 175,
	// 	backgroundColor: "#DC0F0F",
	// 	height: 60,
	// 	justifyContent: "center",
	// 	marginTop: 35,
	// 	bottom: 10,
	// 	marginLeft: 30,
	// 	borderRadius: 10,
	// 	borderWidth: 1,
	// 	borderColor: "#000000",
	// },
	// pill: {
	// 	width: 50,
	// 	height: 50,
	// 	bottom: 15,
	// 	left: 30,
	// },
	// car: {
	// 	width: 90,
	// 	height: 50,
	// 	bottom: 15,
	// 	left: 15,
	// },
});

export default ViewPrescriptions;
