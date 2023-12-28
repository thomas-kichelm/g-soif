// WaterPointsMap.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';

import L from 'leaflet';
import iconUrl from '../icon.png';

const customIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const WaterPointsMap = () => {
  const [waterPoints, setWaterPoints] = useState([]);
  const apiUrl = 'https://owater.gogocarto.fr/api/elements?categories=&bounds=-0.74707%2C43.77109%2C0.59326%2C44.71551';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setWaterPoints(response.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="map-container">
      <h1>Carte des points d'eau potable</h1>
      <MapContainer center={[43.946, 0.719]} zoom={10} className="custom-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
        />
        {waterPoints && waterPoints.map(point => (
          <Marker
            position={[point.geo.latitude, point.geo.longitude]}
            icon={customIcon}
            key={point.id}
          >
            <Popup>
              <div>
                <h2>{point.name}</h2>
                {/* Lien pour ouvrir l'application GPS avec les coordonnées pour l'itinéraire */}
                <p>
                  <a
                    href={`geo:${point.geo.latitude},${point.geo.longitude}?q=${point.geo.latitude},${point.geo.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ouvrir l'application GPS pour obtenir l'itinéraire
                  </a>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WaterPointsMap;
