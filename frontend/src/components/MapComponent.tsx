"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue in Next.js
if (typeof window !== 'undefined') {
  const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const LocationPickerMarker = ({ onLocationSelect }: { onLocationSelect?: (pos: [number, number]) => void }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      if (onLocationSelect) onLocationSelect(newPos);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const newPos: [number, number] = [marker.getLatLng().lat, marker.getLatLng().lng];
          setPosition(newPos);
          if (onLocationSelect) onLocationSelect(newPos);
        }
      }}
    >
      <Popup>Your Selected Location</Popup>
    </Marker>
  );
};

const MapComponent = ({ isPicker, onLocationSelect }: { isPicker?: boolean, onLocationSelect?: (pos: [number, number]) => void }) => {
  const center: [number, number] = [28.6139, 77.2090]; // Delhi/NCR

  return (
    <div className={`w-full ${isPicker ? 'h-full' : 'h-[300px] mb-6'} rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10`}>
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} zoom={13} />
        
        {isPicker ? (
          <LocationPickerMarker onLocationSelect={onLocationSelect} />
        ) : (
          <>
            <Marker position={[28.6139, 77.2090]}>
              <Popup>
                <div className="p-1 font-sans">
                  <p className="font-bold text-blue-600">DLF Cyber Hub P3</p>
                </div>
              </Popup>
            </Marker>
            <Marker position={[28.6200, 77.2200]}>
              <Popup>
                <div className="p-1 font-sans font-bold text-red-600">Ambience Mall South</div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
