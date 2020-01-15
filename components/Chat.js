import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, TextInput, Alert, TouchableOpacity, Button, View } from 'react-native';

export default class Chat extends Component {


  //this will put the users name in navigation bar

  static navigationOptions = ({ navigation }) =>{
    return {
      title: navigation.state.params.username,
    }
  }


  render(){


  return (
    <View 
    style={[styles.container, 
        {backgroundColor: this.props.navigation.state.params.color}] }>
      
      <Text style={{color: '#FFFFFF', fontSize:24}}>Welcome to the chat</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});