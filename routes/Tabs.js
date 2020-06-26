import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../screen/Home';
import More from '../screen/More';
import Search from '../screen/Search';
import Soon from '../screen/Soon';
import Downloads from '../screen/Downloads';

const Tab = createBottomTabNavigator();

export default Tabs = () => {
    return (
        <>
        <Tab.Navigator 
        tabBarOptions={{
            activeTintColor: 'white',
            style: {
            backgroundColor: '#1a1718',
            borderTopColor: 'transparent',
            },
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Entypo name="home" size={size} color={color} />;
                }
            }} />
            <Tab.Screen name="Buscar" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <FontAwesome5 name="search" size={size} color={color} />;
                }
            }}/>
            <Tab.Screen name="Soon" component={Soon} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <MaterialIcons name="fiber-new" size={size} color={color} />;
                }
            }}/>
            <Tab.Screen name="Downloads" component={Downloads} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <MaterialIcons name="file-download" size={size} color={color} />;
                }
            }}/>
            <Tab.Screen name="More" component={More} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Entypo name="menu" size={size} color={color} />;
                }
            }}/>
        </Tab.Navigator>
        </>
    );
}