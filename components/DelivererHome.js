import React from "react";
import {
	TouchableOpacity,
	ImageBackground,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
} from "react-native";

class DelivererHome extends React.Component {
	state = { name: "test" };
	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<ImageBackground
					source={require("../assets/background.jpg")}
					style={styles.backgroundImg}
				>
					<Image
						source={require("../assets/logo.png")}
						style={{ top: 0 }}
					/>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 20,
							marginBottom: 50,
						}}
					>
						{this.state.name.toUpperCase()}'S HOMEPAGE
					</Text>
					<TouchableOpacity style={styles.button}>
						<Image
							source={require("../assets/pill_logo.png")}
							style={styles.buttonImg}
						/>
						<Text style={styles.buttonText}>START DELIVERY</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Image
							source={require("../assets/man.png")}
							style={styles.buttonImg}
						/>
						<Text style={styles.buttonText}>VIEW ACCOUNT</Text>
					</TouchableOpacity>
				</ImageBackground>
			</TouchableWithoutFeedback>
		);
	}
}

export default DelivererHome;

const styles = StyleSheet.create({
	backgroundImg: {
		flex: 1,
		resizeMode: "center",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	button: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 6,
		backgroundColor: "white",
		width: "80%",
		height: "8%",
		marginVertical: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonImg: {
		width: 10,
		height: 10,
		aspectRatio: 1,
		width: 45,
		marginRight: 20,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 18,
	},
});
