import React from "react";
import { View, StyleSheet } from "react-native";

class DriverAccount extends React.Component {
	static navigationOptions = {
		title: "",
		headerLeft: null,
		headerStyle: {
			height: 0,
		},
		headerShown: false,
	};

	state = {};
	render() {
		return <View></View>;
	}
}

export default DriverAccount;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
