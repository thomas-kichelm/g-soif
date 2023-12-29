import React, { useEffect, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const WaterPointsMap = () => {
  const [waterPoints, setWaterPoints] = useState([]);

  useEffect(() => {
    fetchWaterPoints();
  }, []);

  const fetchWaterPoints = async () => {
    try {
      const response = await fetch('https://owater.gogocarto.fr/api/elements?categories=&bounds=-0.74707%2C43.77109%2C0.59326%2C44.71551');
      const data = await response.json();
      setWaterPoints(data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openGPSApp = (latitude, longitude) => {
    const url = `geo:${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening GPS app:', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.946,
          longitude: 0.719,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {waterPoints.map(point => (
          <Marker
  key={point.id}
  coordinate={{ latitude: point.geo.latitude, longitude: point.geo.longitude }}
>
  <Callout onPress={() => openGPSApp(point.geo.latitude, point.geo.longitude)}>
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>{point.name}</Text>
      <Text style={{ color: 'black' }}>Appuyez pour ouvrir l'application GPS</Text>
    </View>
  </Callout>
</Marker>
        ))}
      </MapView>
    </View>
  );
};

export default WaterPointsMap;
