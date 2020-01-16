import React, { Component } from 'react';
import {Platform  } from 'react-native';
import { StyleSheet, View,ScrollView } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chat extends Component {

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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }



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



  //this will put the users name in navigation bar

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
    }}
  />
  
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