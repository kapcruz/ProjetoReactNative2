import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Avatar from '../components/Avatar';

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
`;

const GoBackButton = styled.Button`
  background-color: black;
  font-size: 16px;
  font-weight: bold;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const twoBytwo = (profiles) => {
  const result = [];
  profiles.map((item, index) => {
    if (index % 2 === 0) result.push([]);
    result[Math.floor(index / 2)].push(item);
  });
  return result;
};

const ProfileToEdit = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Gerenciar perfis',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: '#ffffff',
      },
      headerTintColor: 'white',
      headerLeft: () => (
        <GoBackButton
          onPress={() => props.navigation.goBack()}
          title="Concluído"
          color="black"
        />
      ),
    });
  }, []);

  const items = twoBytwo(props?.route?.params?.profiles);

  return (
    <Screen>
      {items.map((row, rowIndex) => (
        <Row key={rowIndex} items={row} {...props} />
      ))}
    </Screen>
  );
};

const Row = (props) => {
  return (
    <RowContainer style={{flexDirection: 'row', justifyContent: 'center'}}>
      {props.items.map((column, colIndex) => (
        <Avatar
          key={column.name}
          big={true}
          onPress={() => {
            props.navigation.navigate('ChooseIcon', {name: column.name});
          }}
          edit
          image={column.icon}
          uri={column.uri}
          name={column.name}
        />
      ))}
    </RowContainer>
  );
};

export default ProfileToEdit;
