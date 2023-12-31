import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useDarkMode } from '../DarkModeContext';

const WaterTracker = () => {
  const { isEnabled } = useDarkMode();
  const [waterCount, setWaterCount] = useState(0);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const today = "Aujourd'hui"; // Libellé pour la date actuelle
    const previousDays = generatePreviousDays();
    const data = previousDays.concat([{ value: waterCount, label: today , frontColor: "lightgray"}]);
    setBarData(data);
  }, [waterCount]);

  const incrementWaterCount = () => {
    setWaterCount(prevCount => prevCount + 1);
  };

  const generatePreviousDays = () => {
    const previousDays = [
      { value: 3, label: 'Lun' },
      { value: 5, label: 'Mar' },
      { value: 4, label: 'Mer' },
      { value: 2, label: 'Jeu' }
    ];
    return previousDays;
  };

  return (
    <View style={[styles.container, isEnabled ? styles.darkContainer : null]}>
      <Text style={[styles.title, isEnabled ? styles.darkTitle : null]}>Suivi de consommation d'eau</Text>
      <BarChart
      barBorderRadius={4}
        barWidth={50}
        hideRules
        noOfSections={5}
        frontColor={ '#177AD5'}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        showReferenceLine1
        referenceLine1Position={10}
        referenceLine1Config={{
          color: 'red',
          dashWidth: 2,
          dashGap: 3,
        }}
      />
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
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
