// CustomIcons.js

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet'; // Importez 'L' depuis leaflet

library.add(faGlassWhiskey);

export const WaterIcon = L.divIcon({
  html: '<div><i class="fas fa-glass-whiskey"></i></div>',
  iconSize: [32, 32],
  className: 'water-icon'
});