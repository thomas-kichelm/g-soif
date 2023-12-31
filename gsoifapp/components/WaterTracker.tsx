import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDarkMode } from '../DarkModeContext';

const WaterTracker = () => {
  const {isEnabled} = useDarkMode(); // Récupérer la valeur du mode sombre depuis le contexte

  const [waterCount, setWaterCount] = useState(0);

  const incrementWaterCount = () => {
    setWaterCount(prevCount => prevCount + 1);
  };

  return (
    <View style={[styles.container, isEnabled ? styles.darkContainer : null]}>
      <Text style={[styles.title, isEnabled ? styles.darkTitle : null]}>Suivi de consommation d'eau</Text>
      <Text style={[styles.text, isEnabled ? styles.darkText : null]}>Verres d'eau bus aujourd'hui : {waterCount}</Text>
      <TouchableOpacity style={[styles.button, isEnabled ? styles.darkButton : null]} onPress={incrementWaterCount}>
        <Text style={styles.buttonText}>Ajouter un verre</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  darkTitle: {
    color: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WaterTracker;
