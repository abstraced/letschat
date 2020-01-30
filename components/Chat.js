import React, { Component } from "react";
import { Platform } from "react-native";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";


console.disableYellowBox = true;


//import firebase
import firebase from "./firebase";

import NetInfo from "@react-native-community/netinfo";

import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import MapView from 'react-native-maps';
import KeyboardSpacer from "react-native-keyboard-spacer";


import CustomActions from './CustomActions';



export default class Chat extends Component {

  constructor() {

    super();
    this.state = {

      isConnected: false,
      messages: [],
      loadingText: "please wait...",

      user: {
        _id: "",
        username: "",
        avatar: "",
      }
    };
  }


  componentDidMount() {

    // check if online via NetInfo
    const unsubscribe = NetInfo.addEventListener(state => {



      if (state.isConnected) {
        console.log('online');

        //firebase authentication
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          //update user state with currently active user data
          this.setState({
            isConnected: true,
            user: {
              _id: user.uid,
              username: this.props.navigation.state.params.username,
              avatar: ""
            },
            loadingText: "Connected"
          });

          // create a reference to the active user's documents (messages) and start listening
          this.referenceMessages = firebase.firestore().collection("messages");
          this.unsubscribeMessages = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
        });

      } else {
        console.log('offline');
        this.getMessages();
        this.setState({
          isConnected: false,
          loadingText: 'You are offline'
        });

      }
    });
  }

  componentWillUnmount() {
  // stop listening to data changes:
    this.unsubscribeMessages();
    this.authUnsubscribe();

  }

  // FIREBASE RELATED

  // handle changes of data and pass them to the state from the store:
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null
      });
    });

    //sort the array so it's in the chronological order
    messages.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      messages
    });
  };



  /// add the message to the firestore
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null
    });
  }


  ///OFFLINE AND ASYNCSTRORAGE
  //fetch message from localstorage (if offline)
  getMessages = async () => {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }


  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }



  ///GIFT Functionality

  //Custom action (sennd picture, take picture, geolocalization)
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };


  ///render geolocalisation
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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


  // Hide INPUT if user disconnected
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  // ON SEND FUNCTION: ADD to firebase and save to asyncstorage
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  ////Username in the navigation bar

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
          renderActions={this.renderCustomActions}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={messages => this.onSend(messages)}
          renderCustomView={this.renderCustomView}
          user={this.state.user}
        />

        {/* KEYSPACER FOR ANDROID DEVICE */}
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}



//STYLES STYLES STYLES STYLES STYLES STYLES STYLES STYLES STYLES STYLES 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
