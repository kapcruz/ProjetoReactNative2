import React from 'react';
import {View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import styled, {css} from 'styled-components/native';

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
`;

const avatarSize = css`
  width: ${(props) => {
    console.log('avatarSize', props);
    return props.big ? '100px' : '60px';
  }};
  height: ${(props) => (props.big ? '100px' : '60px')};
  margin: 10px;
`;

const AvatarIcon = styled.Image`
  ${avatarSize}
`;

const AvatarText = styled.Text`
  color: white;
`;

const Overlay = styled.View`
  ${avatarSize}
  position: absolute;
  background-color: black;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;

const OverlayContainer = styled.View`
  ${avatarSize}
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const Editable = (props) => {
  return props.edit ? (
    <OverlayContainer big={props.big}>
      <Overlay big={props.big} />
      <MaterialIcons name="edit" size={24} color="white" />
    </OverlayContainer>
  ) : null;
};

const Avatar = (props) => {
  console.log('avatar', props);
  return (
    <Container style={{alignItems: 'center'}} onPress={props.onPress}>
      {props.uri ? (
        <View>
          <AvatarIcon
            big={props.big}
            source={{isStatic: true, uri: props.uri}}
          />
          <Editable edit={props.edit} {...props} />
        </View>
      ) : (
        <View>
          <AvatarIcon big={props.big} source={props.image} />
          <Editable edit={props.edit} {...props} />
        </View>
      )}

      <AvatarText>{props.name}</AvatarText>
    </Container>
  );
};

export default Avatar;
