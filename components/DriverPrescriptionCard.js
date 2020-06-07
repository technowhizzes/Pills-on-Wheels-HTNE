import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

class DriverPrescriptionCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// console.log("CARD:", this.props.data.item);
		let item = this.props.data.item;
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<View style={styles.card}>
					<Image
						source={require("../assets/prescription_real.png")}
						style={styles.image}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{item.pharmacyAddress}</Text>
						<Text style={styles.text}>{item.pharmacyName}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default DriverPrescriptionCard;

const styles = StyleSheet.create({
	card: {
		borderWidth: 2,
		borderRadius: 10,
		padding: 10,
		marginVertical: 5,
		backgroundColor: "#878bff",
		flexDirection: "row",
		marginHorizontal: "7%",
	},
	image: {
		aspectRatio: 0.7,
		// width: "30%",
		flex: 1,
	},
	text: {
		flex: 1,
		paddingHorizontal: 7,
		textAlignVertical: "center",
	},
	textContainer: {
		flex: 2.8,
		backgroundColor: "white",
	},
});
