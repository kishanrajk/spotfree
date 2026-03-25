"use client";

import React, { useState } from "react";
import { X, MapPin, IndianRupee, Layers, Camera, Navigation } from "lucide-react";
import Map from "./Map";

interface HostRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (lot: any) => void;
}

const HostRegistrationModal: React.FC<HostRegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [lotName, setLotName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  if (!isOpen) return null;

  const handleActivate = () => {
    if (lotName && address && price && slots && selectedLocation) {
      if (onSuccess) {
        onSuccess({
          name: lotName,
          address: address,
          price: parseInt(price),
          available: parseInt(slots),
          distance: "0m",
          rating: 5.0,
          lat: selectedLocation[0],
          lng: selectedLocation[1]
        });
      }
      alert("Success! Your spot is now LIVE and visible to all drivers! 🚀");
      onClose();
    } else {
      alert("Please fill in all details and mark your location on the map.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden animate-slide-up ring-4 ring-white/20 max-h-[95vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-gray-900">List Your Spot</h2>
            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-0.5">Live Instantly ⚡</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8">
          {/* Map Selection */}
          <div>
            <div className="flex justify-between items-end mb-4">
               <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest block">Mark Your Location</span>
               {selectedLocation && <span className="text-[9px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase">📍 Marked</span>}
            </div>
            <div className="h-60 rounded-3xl overflow-hidden border-2 border-gray-100 relative shadow-inner">
               <Map isPicker={true} onLocationSelect={(pos) => setSelectedLocation(pos)} />
               {!selectedLocation && (
                 <div className="absolute inset-0 bg-black/5 pointer-events-none flex items-center justify-center">
                   <div className="bg-white/90 p-3 rounded-2xl shadow-lg border border-white flex items-center space-x-2">
                     <Navigation size={18} className="text-blue-600 animate-bounce" />
                     <span className="text-xs font-black uppercase text-gray-800 tracking-tight">Tap map to pin location</span>
                   </div>
                 </div>
               )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Lot Name</label>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center shadow-sm">
                <MapPin size={18} className="text-blue-600 mr-3" />
                <input 
                  type="text" 
                  placeholder="e.g. My Private Basement" 
                  value={lotName}
                  onChange={(e) => setLotName(e.target.value)}
                  className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-black text-lg p-0 placeholder:text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Full Address</label>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-sm">
                <textarea 
                  rows={2}
                  placeholder="Enter complete address..." 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-transparent border-0 w-full focus:ring-0 text-gray-900 font-bold text-sm p-0 resize-none placeholder:text-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Hourly Rate</label>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center shadow-sm">
                  <span className="text-gray-900 font-black text-lg mr-2">₹</span>
                  <input 
                    type="number" 
                    placeholder="60" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-black text-lg p-0 placeholder:text-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Available Slots</label>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center shadow-sm">
                  <Layers size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="number" 
                    placeholder="2" 
                    value={slots}
                    onChange={(e) => setSlots(e.target.value)}
                    className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-black text-lg p-0 placeholder:text-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button 
              onClick={handleActivate}
              className="w-full bg-blue-600 text-white font-black py-5 rounded-[28px] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Go Live Now! ⚡</span>
            </button>
            <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center leading-relaxed">
              Immediate hosting enabled. No verification delay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostRegistrationModal;
