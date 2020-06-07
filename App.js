import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, YellowBox } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeActivity from "./components/HomeActivity";
import ProfileActivity from "./components/ProfileActivity";
import VerifyScreen from "./components/Verify";
import DelivererHome from "./components/DelivererHome";
import DriverVerifyScreen from "./components/DriverVerify";
import ClientLogin from "./components/ClientLogin";
import DriverLogin from "./components/DriverLogin";
import DriverAccount from "./components/DriverAccount";
import ViewPrescriptions from "./components/ClientViewPrescriptions";
import ClientAddPrescription from "./components/ClientAddPrescription";
import DriverPayment from "./components/DriverPayment";
import ClientAccount from "./components/ClientAccount";
import ClientOrderPrescription from "./components/ClientOrderPrescription";
import ChoosePrescription from "./components/ClientChoosePrescription";

const RootStack = createStackNavigator(
	{
		Home: { screen: HomeActivity },
		Profile: { screen: ProfileActivity },
		Verify: { screen: VerifyScreen },
		DeliverHome: { screen: DelivererHome },
		DriverVerify: { screen: DriverVerifyScreen },
		ClientLoginScreen: { screen: ClientLogin },
		DriverLoginScreen: { screen: DriverLogin },
		DriverAccountScreen: { screen: DriverAccount },
		ViewPrescriptionsScreen: { screen: ViewPrescriptions },
		ClientAddPrescriptionScreen: { screen: ClientAddPrescription },
		DriverPaymentScreen: { screen: DriverPayment },
    ClientAccountScreen: { screen: ClientAccount },
    OrderPrescriptionScreen: { screen: ClientOrderPrescription },
    ChoosePrescriptionScreen: { screen: ChoosePrescription }
	},
	{
		initialRouteName: "Home",
	}
);

export default class App extends Component {
	render() {
		return <RootStack />;
	}
}
