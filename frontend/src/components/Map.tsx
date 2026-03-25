"use client";

import dynamic from 'next/dynamic';

// Dynamic import for Leaflet to avoid SSR errors
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-slate-200 rounded-3xl animate-pulse flex items-center justify-center mb-6">
      <p className="text-gray-400 font-bold">Initializing OpenStreetMap...</p>
    </div>
  )
});

export default function SpotMap() {
  return <MapComponent />;
}
