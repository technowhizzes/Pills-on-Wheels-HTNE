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
    Alert
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
var medName = " ";

class ChoosePrescription extends React.Component {
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
    
    choosedelivery = async ({item}) => {
        console.log("The item is: " + item.name)
        
        Alert.alert(
            'Order Confirmation?',
            'Are you sure you would like to choose this prescription to order?',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate("OrderPrescriptionScreen", {name : item.name, prescripID : item.id})
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
            ],
            { cancelable: false }
            );
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
				console.log(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		//this.goToLogin
		//this.props.navigation.navigate("ViewPrescriptionsScreen");
	};

	componentDidMount() {
        this.RegisterinDB();
        this.forceUpdate();
        
	}

	render() {
		const itemId = this.props.navigation.getParam("id", "NO-ID");
		userId = itemId;

		console.log("Client ID" + userId);

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
                            left: 20
						}}
					>
						YOUR PRESCRIPTIONS
					</Text>
				</View>
				<View style={styles.body}>
					<FlatList
						data={this.state.prescriptions}
						renderItem={(item) => <PrescriptionCard data={item} onPress= {() => this.choosedelivery(item)} />}
					/>
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
		backgroundColor: "#DC0F0F",
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

export default ChoosePrescription;
