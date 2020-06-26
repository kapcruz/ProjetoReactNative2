import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraController from './screen/CameraController';
import Tabs from './routes/Tabs';
import {GetLocation} from './services/movieFilter';

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
				<Stack.Screen name="ProfileToEdit" component={ProfileToEdit} options={{headerShown: false}}/>
				<Stack.Screen name="ChooseIcon" component={ChooseIcon} options={{headerShown: false}}/>
				<Stack.Screen name="CameraController" component={CameraController} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
		);
}

export default App
