import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native'

const firebase = require('firebase');

console.disableYellowBox = true;


import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';





export default class CustomActions extends React.Component {


/// Upload picture to firebase
  uploadPicture = async (imageToUploadUri) => {

    var ref = firebase.storage().ref().child(this.props.messageIdGenerator());
    const response = await fetch(imageToUploadUri);
    const blob = await response.blob();
    const snapshot = await ref.put(blob);


    const firebaseLink = await snapshot.ref.getDownloadURL();

    return firebaseLink;
  }


// pick a picture from the library
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        try {

          var imageLink = await this.uploadPicture(result.uri);
          this.props.onSend({ image: imageLink });

        } catch (err) {
          console.log(err)
        }

      }

    }
  }

  // take a picture with the camera 

  takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        try {

          var imageLink = await this.uploadPicture(result.uri);
          this.props.onSend({ image: imageLink });

        } catch (err) {
          console.log(err)
        }
      }

    }
  }

// get location

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});
      console.log(status);
      if (result) {
        this.props.onSend({ location: result.coords });
        console.log(result);
      }
    }
  }



  onActionsPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        const { onSend } = this.props
        switch (buttonIndex) {
          case 0:
            this.pickImage();
            console.log('user wants to pick an image');
            return
          case 1:
            this.takePicture();
            console.log('user wants to take a photo');
            return
          case 2:
            this.getLocation();
            console.log('user wants to get their location');
          default:
        }
      },
    )
  }





  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon()
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,

}

CustomActions.defaultProps = {
  onSend: () => { },
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
}