import React, { Component } from "react";
import { Platform } from "react-native";
import { StyleSheet, View, Text } from "react-native";

console.disableYellowBox = true;

//import firebase
import firebase from "../firebase";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

import KeyboardSpacer from "react-native-keyboard-spacer";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        username: "",
        avatar: ""
      },
      loadingText: "please wait..."
    };
    // INITIALIZE CONNECTION WITH firestone / name of the collection to look for
  }

  componentDidMount() {
    // Firestore Authentication

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        user: {
          _id: user.uid,
          username: this.props.navigation.state.params.username,
          avatar: ""
        },
        loadingText: "Connected"
      });

      // create a reference to the active user's documents (messages) and start listening
      this.referenceMessages = firebase.firestore().collection("messages");
      this.unsubscribeMessages = this.referenceMessages.onSnapshot(
        this.onCollectionUpdate
      );
    });
  }

  componentWillUnmount() {
    // stop listening to data changes:
    this.unsubscribeMessages();
    this.authUnsubscribe();
  }

  // handle changes of data:
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });

    //  sort the array so it's in the chronological order
    messages.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      messages
    });
  };

  // ON SEND FUNCTION
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  /// add the message to the firestore
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user
    });
  }

  // CHANGE COLOR OF THE BUBBLE
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          }
        }}
      />
    );
  }

  //Username in the navigation bar

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.username
    };
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.state.params.color }
        ]}
      >
        <Text> {this.state.loadingText}</Text>

        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />

        {/* KEYSPACER FOR ANDROID DEVICE */}
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
