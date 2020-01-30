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
// import firebase from "../firebase";
// import firebase from "./firebase";


console.disableYellowBox = true;


import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';

// import firebase from "./firebase";
// import MapView from 'react-native-maps';



export default class CustomActions extends React.Component {


  // https://github.com/tdnicola/React-Native-Chat-App/blob/45eab3ed36c59f91638b9edbaf3ad4f23f10e078/components/CustomActions.js

  
//   // uploading image to the cloud
//   uploadImage = async (uri) => {
//     const blob = await new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = (() => {
//             resolve(xhr.response);
//         });
//         xhr.onerror = ((e) => {
//             console.log(e);
//             reject(new TypeError('NETWORK REQUEST FAILED'));
//         });
//         xhr.responseType = 'blob';
//         xhr.open('GET', uri, true);
//         xhr.send(null);
//     });

//     const getImageName = uri.split('/')
//     const imageArrayLength = getImageName.length - 1
    
//     const ref = firebase.storage().ref().child(getImageName[imageArrayLength]);
//     console.log(ref, getImageName[imageArrayLength])
//     const snapshot = await ref.put(blob);

//     blob.close();

//   //spitting out image url
//     const imageURL = await snapshot.ref.getDownloadURL()
//     return imageURL
// }

      
        
//       }
  
//     }
//   }


uploadPicture = async(imageToUploadUri) => {

  var ref = firebase.storage().ref().child(this.props.messageIdGenerator());
  const response = await fetch(imageToUploadUri);
  const blob = await response.blob();
  const snapshot = await ref.put(blob);


 const firebaseLink = await snapshot.ref.getDownloadURL();

  return firebaseLink;
}

pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));
  
      if (!result.cancelled) {
        try {
        
         var imageLink =  await this.uploadPicture (result.uri);
         this.props.onSend({ image: imageLink});
        
      } catch(err) {
          console.log(err)
      }
   
      }
  
    }
}

takePicture = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);

  if(status === 'granted') {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
    }).catch(error => console.log(error));

    if (!result.cancelled) {
      try {
      
       var imageLink =  await this.uploadPicture (result.uri);
       this.props.onSend({ image: imageLink});
      
    } catch(err) {
        console.log(err)
    }
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
  onSend: () => {},
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