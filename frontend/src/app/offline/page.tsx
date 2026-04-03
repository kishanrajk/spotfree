"use client";

import { WifiOff } from "lucide-react";

export default function Offline() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <WifiOff size={48} className="text-red-600" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-2">You're Offline</h1>
      <p className="text-gray-500 max-w-xs mb-8">
        It looks like you've lost your internet connection. Don't worry, SpotFree still has your last known bookings saved.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95"
      >
        Retry Connection
      </button>
    </div>
  );
}
