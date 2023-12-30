import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useDarkMode } from '../DarkModeContext';

const SettingsScreen = () => {
  const { isEnabled, toggleSwitch } = useDarkMode();

  const onToggleSwitch = () => {
    toggleSwitch(); // Appelle la fonction pour changer le mode sombre dans le contexte
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isEnabled ? '#3e3e3e' : 'white' }}>
      <Text style={{ color: isEnabled ? 'white' : 'black' }}>Mode Sombre</Text>
      <Switch
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggleSwitch} // Utilise la fonction onToggleSwitch pour le changement de valeur
        value={isEnabled}
      />
    </View>
  );
};

export default SettingsScreen;
