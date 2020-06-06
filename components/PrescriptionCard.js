import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

class PrescriptionCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// console.log("CARD:", this.props.data.item);
		let item = this.props.data.item;
		return (
			<TouchableOpacity>
				<View style={styles.card}>
					<Image
						source={require("../assets/prescription_real.png")}
						style={styles.image}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{item.name.toUpperCase()}
						</Text>
						<Text style={styles.text}>
							PRESCRIBED BY: {item.prescribingDoctor}
						</Text>
						<Text style={styles.text}>
							PRESCRIPTION #: {item.number}
						</Text>
						<Text style={styles.text}>
							# OF REFILS: {item.reps}
						</Text>
						<Text style={styles.text}>MEDICINE INSTRUCTIONS:</Text>
						<Text style={styles.text}> - {item.dose}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default PrescriptionCard;

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
