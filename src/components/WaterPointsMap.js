// src/components/WaterPointsMap.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Assurez-vous d'importer les styles CSS de Leaflet
import './styles.css';

import L from 'leaflet';
import iconUrl from '../icon.png'; // Remplacez ceci par le chemin vers votre image PNG
const customIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône
    popupAnchor: [0, -32], // Position de la popup par rapport à l'icône
  });

const WaterPointsMap = () => {
  const [waterPoints, setWaterPoints] = useState([]);
  const apiUrl = 'https://owaterorg.gogocarto.fr/api/elements.json?categories=&bounds=-0.74707%2C43.77109%2C0.59326%2C44.71551';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setWaterPoints(response.data.data || []); // Assurez-vous que response.data.data est défini ou initialisez-le à un tableau vide
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div map-container>
      <h1>Carte des points d'eau potable</h1>
      <MapContainer center={[43.946, 0.719]} zoom={10} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
        />
        {waterPoints && waterPoints.map(point => (
          <Marker
            position={[point.geo.latitude, point.geo.longitude]}
            icon={customIcon} // Utilisez l'icône WaterIcon comme marqueur
            key={point.id}
          >
            <Popup>
              <div>
                <h2>{point.name}</h2> 
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}; 

export default WaterPointsMap;
