"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapComponent = () => {
  const center: [number, number] = [28.6139, 77.2090]; // Delhi/NCR

  return (
    <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-6 z-10">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} zoom={13} />
        
        {/* Mock Marker for Nearby Parking */}
        <Marker position={[28.6139, 77.2090]}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="font-bold text-blue-600">DLF Cyber Hub P3</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Available: 24 Slots</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={[28.6200, 77.2200]}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="font-bold text-red-600">Ambience Mall South</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Available: 15 Slots</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
