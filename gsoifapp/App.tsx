import React from 'react';
import { DarkModeProvider } from './DarkModeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import WaterTracker from './components/WaterTracker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCog, faBottleWater } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <DarkModeProvider>
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
            else if (route.name === 'Eau') {
              icon = <FontAwesomeIcon icon={faBottleWater} size={size} color={color} />;
            }
            return icon;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Eau" component={WaterTracker} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </DarkModeProvider>
  );
};

export default App;
