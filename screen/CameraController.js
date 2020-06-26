'use strict';
import React, {PureComponent} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, StyleSheet} from 'react-native';
import {Camera} from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


export default class CameraController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null, 
      type: Camera.Constants.Type.back,
      pictureTaken: false,
    };
  }

  componentDidMount() {
    this.requestPermissionsAsync();
  }

  async requestPermissionsAsync() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({hasPermission: (status === 'granted')});
  }

  async takePicture() {
    if(this.camera) {
      this.setState({pictureTaken: true});

      let photo = await this.camera.takePictureAsync(
        {
          quality: 0.5,
          base64: true,
        });
      this.props.navigation.navigate('More', {
        name: this.props?.route?.params?.name,
        image: photo
      });
      
    } else {
      console.error('camera reference not found');
      this.props.navigation.navigate('More');
    }
  }

  render() {
    if (this.state.hasPermission === null) {
      return <View></View>;
    } else if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            type={this.state.type}   
            ref={ref => {
                  this.camera = ref;
                }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState(
                    {
                      type: (this.state.type === Camera.Constants.Type.back) ? Camera.Constants.Type.front : Camera.Constants.Type.back
                    });
                }}>
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={ () => this.takePicture()}>
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
            {this.state.pictureTaken &&
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            }
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
