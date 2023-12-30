// Nav.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../DarkModeContext';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Nav = () => {
  const { isEnabled } = useDarkMode();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === 'Accueil') {
              icon = <FontAwesomeIcon icon={faHome} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              icon = <FontAwesomeIcon icon={faCog} size={size} color={color} />;
            }
            return icon;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: isEnabled ? '#3e3e3e' : 'white',
            borderTopColor: isEnabled ? 'black' : 'white',
          },
          activeTintColor: isEnabled ? 'white' : 'black',
        }}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
