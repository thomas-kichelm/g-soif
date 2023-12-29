import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Linking, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const WaterPointsMap = () => {
  const [waterPoints, setWaterPoints] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 43.946,
    longitude: 0.719,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetchWaterPoints();
  }, [currentRegion]);

  const fetchWaterPoints = async () => {
    try {
      const response = await fetch(
        `https://owater.gogocarto.fr/api/elements?limit=100&categories=&bounds=${currentRegion.longitude - currentRegion.longitudeDelta}%2C${currentRegion.latitude - currentRegion.latitudeDelta}%2C${currentRegion.longitude + currentRegion.longitudeDelta}%2C${currentRegion.latitude + currentRegion.latitudeDelta}`
      );
      const data = await response.json();
      setWaterPoints(data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openGPSApp = (latitude, longitude, pointName) => {
    const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${pointName})`;
    Linking.openURL(url).catch(err => console.error('Error opening GPS app:', err));
  };

  const handleRegionChangeComplete = useCallback(region => {
    setCurrentRegion(region);
  }, []);

  const handleUserLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setCurrentRegion(newRegion);
        setUserLocation({ latitude, longitude });
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      },
      error => console.error('Error getting user location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
      minZoomLevel={7}
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {waterPoints.map(point => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.geo.latitude,
              longitude: point.geo.longitude,
            }}
          >
            <Callout onPress={() => openGPSApp(point.geo.latitude, point.geo.longitude, point.name)}>
              <View style={{ backgroundColor: 'white', padding: 10 }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>{point.name}</Text>
                <Text style={{ color: 'black' }}>Appuyez pour ouvrir l'application GPS</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Votre position"
            description="Vous êtes ici"
            pinColor="blue"
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button title="Ma position" onPress={handleUserLocation} />
      </View>
    </View>
  );
};

export default WaterPointsMap;
