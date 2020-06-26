import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Avatar from '../components/Avatar';

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  align-content: center;
`;

const Row = styled.ScrollView`
  height: 80px;
`;

const Label = styled.Text`
  color: white;
  padding: 10px;
`;

const Button = styled.Button`
  margin: 10px;
  background-color: white;
`;

let iconsAvailables = [
  require('../assets/avatars/avatar6.png'),
  require('../assets/avatars/avatar5.png'),
  require('../assets/avatars/avatar4.png'),
  require('../assets/avatars/avatar3.png'),
  require('../assets/avatars/avatar2.png'),
  require('../assets/avatars/avatar1.png'),
];

const ChooseIcon = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Choose your Avatar',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: '#ffffff',
      },
      headerTintColor: 'white',
    });
  }, []);

  return (
    <Screen>
      <Label>Classic</Label>
      <View style={{height: 80}}>
        <Row horizontal>
          {iconsAvailables.map((item, index) => (
            <Avatar
              key={index}
              image={item}
              onPress={() => {
                props.navigation.navigate('More', {
                  icon: item,
                  name: props?.route?.params?.name,
                  image: null,
                });
              }}
            />
          ))}
        </Row>
      </View>
      <Label>Create your avatar</Label>
      <Button
        color="#1a1718"
        title="CAMERA"
        onPress={() => {
          props.navigation.navigate('CameraController', {
            name: props?.route?.params?.name,
          });
        }}
      />
    </Screen>
  );
};

export default ChooseIcon;
