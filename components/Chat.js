import React, { Component } from 'react';
import {Platform  } from 'react-native';
import { StyleSheet, View,ScrollView } from 'react-native';


//import firebase
import firebase from '../firebase';


import { GiftedChat,Bubble } from 'react-native-gifted-chat';

import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chat extends Component {



  constructor() {
    super();
     this.state = {
      messages: [],
       
     };
     // INITIALIZE CONNECTION WITH firestone / name of the collection to look for
     this.referenceMessages = firebase.firestore().collection('messages');
     
    
   }


  state = {
    messages: []
  };



  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'You have entered the chat',
          createdAt: new Date(),
          system: true,
         },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        
 
        
      ],
    })
  }

  // ON SEND FUNCTION 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }


// CHANGE COLOR OF THE BUBBLE
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }



  //Username in the navigation bar

  static navigationOptions = ({ navigation }) =>{
    return {
      title: navigation.state.params.username,
    }
  }


  render(){




  return (
   
    <View style={[styles.container, {backgroundColor: this.props.navigation.state.params.color}]}>
   
   
    <GiftedChat
     renderBubble={this.renderBubble.bind(this)}
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    user={{
      _id: 1,
     }} />

  {/* KEYSPACER FOR ANDROID DEVICE */}
  {Platform.OS === 'android' ? <KeyboardSpacer /> : null }

  </View>
  );
}
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});


{/* <View 
style={[styles.container, 
    {backgroundColor: this.props.navigation.state.params.color}] }>
  
  <Text style={{color: '#FFFFFF', fontSize:24}}>Welcome to the chat</Text>
</View> */}