import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import WaterPointsMap from './components/WaterPointsMap';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <WaterPointsMap />
    </SafeAreaView>
  );
};

export default App;
