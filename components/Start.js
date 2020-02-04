import React, { Component } from "react";



import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity
} from "react-native";



// KEYBOARD SPACER
import KeyboardSpacer from "react-native-keyboard-spacer";




export const BackgroundImage = require("../assets/backgroundimage.png");

const color1 = "#090C08";
const color2 = "#474056";
const color3 = "#8A95A5";
const color4 = "#B9C6AE";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Unknown",
      color: ""
    };
  }

  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.background}>
        <View style={styles.all}>
          <View style={styles.title}>
            <Text style={styles.title_text}> Let's chat</Text>
          </View>

          {/* USER INTERFACE */}
          <View style={styles.content}>
            {/* Select username */}
            <View style={styles.view_content1}>
              <TextInput
                accessible={true}
                accessibilityLabel="Name input"
                accessibilityHint="Lets you choose your username"
                style={styles.input}
                placeholder="    Your name"
                placeholderTextColor="black"
                onChangeText={username => this.setState({ username })}
              />
            </View>

            {/* SELECT BACKGROUND COLOR */}
            <View style={styles.view_content2}>
              <View>
                <Text>Choose your backdground color </Text>
              </View>
              <View style={styles.colorChoice}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Color background"
                  accessibilityHint="Lets you choose the background color of the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: color1 })}
                  style={[styles.colorButton, { backgroundColor: color1 }]}
                />
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Color background"
                  accessibilityHint="Lets you choose the background color of the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: color2 })}
                  style={[styles.colorButton, { backgroundColor: color2 }]}
                />
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Color background"
                  accessibilityHint="Lets you choose the background color of the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: color3 })}
                  style={[styles.colorButton, { backgroundColor: color3 }]}
                />
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Color background"
                  accessibilityHint="Lets you choose the background color of the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: color4 })}
                  style={[styles.colorButton, { backgroundColor: color4 }]}
                />
              </View>
            </View>

            {/* GO TO THE CHAT */}
            <View style={styles.view_content3}>
              <Button
                accessible={true}
                accessibilityLabel="Go to the chat"
                accessibilityHint="Lets you go to the chatroom"
                accessibilityRole="button"
                style={styles.button}
                onPress={() =>
              
                  this.props.navigation.navigate("Chat", {
                    username: this.state.username,
                    color: this.state.color
                  })
                }
                title="Start Chatting"
              />
            </View>
          </View>
        </View>
        <KeyboardSpacer />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%"
  },
  all: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    flex: 0.56,
    justifyContent: "center"
  },
  title_text: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignContent: "center"
  },

  content: {
    flex: 0.44,
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10
  },
  view_content1: {
    height: 35,
    borderWidth: 1,
    width: "88%",
    borderColor: "black"
  },
  view_content2: {
    flex: 0.24
  },
  view_content3: {
    flex: 0.1,
    width: "88%"
  },
  colorChoice: {
    flex: 1,
    width: "100%",
    flexDirection: "row"
  },

  input: {},

  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
