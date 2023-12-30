import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === 'dark');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // Ajoutez ici la logique pour sauvegarder le mode sombre dans AsyncStorage ou Redux
  };

  useEffect(() => {
    setIsEnabled(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <DarkModeContext.Provider value={{ isEnabled, toggleSwitch }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
