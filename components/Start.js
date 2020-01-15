import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Button,ImageBackground,Image, TouchableOpacity } from 'react-native';

export const BackgroundImage = require('../assets/backgroundimage.png'); 




const color1 ='red';
const color2 ='black';
const color3 ='green';
const color4 ='blue';

export default class Start extends Component {


  constructor(props) {

    super(props);
     this.state = { 
       username: 'Unknown', 
       color:''
            
      };
     
 }

    render(){
        return (
          <ImageBackground source={BackgroundImage}style={styles.background} >  
          <View style={styles.all}>
            <View style={styles.title}>
              <Text style={styles.title_text}> Let's chat</Text>
            </View>
      
          
           <View style={styles.content}>
      
      {/* Select username */}
               <View style={styles.view_content1}>
               <TextInput style={styles.input} placeholder="    Your name" 
               placeholderTextColor='black' 
               onChangeText={(username) => this.setState({username})}  /> 
               </View>
      
      
      {/* SELECT BACKGROUND COLOR */}
               <View style={styles.view_content2}>
                    <Text>Choose your backdground color </Text>
               <View>
               <TouchableOpacity
onPress={() => this.setState({ color: color1})}
style={[styles.colorButton, {backgroundColor: color1}]}
/>
<TouchableOpacity
onPress={() => this.setState({ color: color2})}
style={[styles.colorButton, {backgroundColor: color2 }]}
/>
<TouchableOpacity
onPress={() => this.setState({ color: color3})}
style={[styles.colorButton, {backgroundColor: color3}]}
/>
<TouchableOpacity
onPress={() => this.setState({ color: color4})}
style={[styles.colorButton, {backgroundColor:color4 }]}
/>
               
                </View>
      
      
                </View>
      
         {/* GO TO THE CHAT */}
                <View style={styles.view_content3}>
                <Button style={styles.button} 
                  onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, color: this.state.color})}
                  title="Start Chatting"/>
                  </View>
         
          
             </View>
          </View>
          </ImageBackground>
            

        )


    }
}

const styles = StyleSheet.create({

  background: {
    width:'100%',
    height:'100%'
  },
  colorButton: {
 width:100,
 height:100

  }

})




