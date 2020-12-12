import 'react-native-gesture-handler';
import * as React from 'react';
import HomeRoutes from './HomeRoutes';
import MoreRoutes from './MoreRoutes';
import Home from '../screen/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Entypo, AntDesign, MaterialIcons, Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        backgroundColor: 'black',
        activeTintColor: 'white',
        style: {
          backgroundColor: '#1a1718',
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Busca"
        component={Home}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Em Breve'}
        component={Home}
        options={{
          tabBarLabel: 'Soon',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="perm-media" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Home}
        options={{
          tabBarLabel: 'Downloads',
          tabBarIcon: ({color, size}) => (
            <Feather name="download" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mais"
        component={MoreRoutes}
        options={{
          tabBarLabel: 'Mais',
          tabBarIcon: ({color, size}) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
