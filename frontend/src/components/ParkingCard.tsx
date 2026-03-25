import React from 'react';
import { MapPin } from 'lucide-react';

interface ParkingCardProps {
  name: string;
  address: string;
  distance: string;
  price: number;
  available: number;
  rating: number;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ name, address, distance, price, available, rating }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 border border-gray-100 transition-all hover:shadow-xl active:scale-[0.98]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 flex items-center">
            <MapPin size={14} className="mr-1" /> {distance} away
          </p>
        </div>
        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
          {available} slots
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-yellow-500 text-sm">★</span>
        <span className="text-gray-700 text-sm ml-1 font-medium">{rating}</span>
        <span className="text-gray-400 text-xs ml-2">{address}</span>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Price</p>
          <p className="text-lg font-extrabold text-blue-600">₹{price}<small className="text-gray-400 font-normal">/hr</small></p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ParkingCard;
