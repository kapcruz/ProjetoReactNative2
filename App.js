import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AsyncStorage } from "react-native";
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraController from './screen/CameraController';
import More from './screen/More';
import Tabs from './routes/Tabs';
import {GetLocation} from './services/movieFilter';
import { ProfileContext } from "./context/ProfileContext";

const Stack = createStackNavigator();


export default class App extends React.Component {
	constructor(props) {
	  super(props);
  
	  AsyncStorage.getItem("profile").then((result) => {
		this.setState({ user: result });
	  });
  
	  this.changeProfile = this.changeProfile.bind(this);
  
	  this.state = {
		user: null,
		changeProfile: this.changeProfile,
	  };
	}
  
	changeProfile(newUser) {
	  this.setState({ user: newUser.name });
	}
  
	render() {
	  return (
		<ProfileContext.Provider value={this.state}>
		  <NavigationContainer>
			<Stack.Navigator>
			  <Stack.Screen
				name="Tabs"
				component={Tabs}
				options={{ headerShown: false }}
			  />
			  <Stack.Screen
				name="CameraController"
				component={CameraController}
				options={{ headerShown: false }}
			  />
			  <Stack.Screen
				name="ChooseIcon"
				component={ChooseIcon}
				options={{ headerShown: false }}
			  />
			  <Stack.Screen
				name="More"
				component={More}
				options={{ headerShown: false }}
			  />
			  <Stack.Screen
				name="ProfileToEdit"
				component={ProfileToEdit}
				options={{ headerShown: true }}
			  />
			</Stack.Navigator>
		  </NavigationContainer>
		</ProfileContext.Provider>
	  );
	}
  }