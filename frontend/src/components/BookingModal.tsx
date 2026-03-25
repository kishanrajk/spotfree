import React from 'react';
import { X, CheckCircle, Navigation } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingName: string;
  slotNumber: string;
  price: number;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, parkingName, slotNumber, price }) => {
  const [hours, setHours] = React.useState(1);
  const [vehicleNo, setVehicleNo] = React.useState("");
  if (!isOpen) return null;

  const totalPrice = hours * price;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden animate-slide-up ring-4 ring-white/20">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Confirm Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-2">{parkingName}</h3>
          <p className="text-gray-500 font-medium mb-8 text-center">Slot <span className="text-blue-600 font-bold">{slotNumber}</span> is available for reservation.</p>

          <div className="w-full bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 space-y-6">
            {/* Vehicle Field */}
            <div>
              <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-2 block">Vehicle Number</span>
              <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center shadow-sm">
                <span className="bg-gray-100 text-gray-400 px-2 py-1 rounded text-[10px] font-black mr-3">IND</span>
                <input 
                  type="text" 
                  placeholder="KA 01 AB 1234" 
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                  className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-black text-lg p-0 placeholder:text-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Duration</span>
              <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button 
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-r border-gray-200"
                  onClick={() => setHours(Math.max(1, hours - 1))}
                >-</button>
                <span className="px-4 py-2 text-gray-900 font-black min-w-[60px] text-center">{hours}h</span>
                <button 
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-l border-gray-200"
                  onClick={() => setHours(Math.min(24, hours + 1))}
                >+</button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-center block mb-1">Estimated Total</span>
                <span className="text-blue-600 font-black text-3xl">₹{totalPrice}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest block mb-1">Rate</span>
                <span className="text-gray-900 font-bold">₹{price}/hr</span>
              </div>
            </div>
          </div>

          <button 
            disabled={!vehicleNo}
            className={`w-full text-white font-black py-5 rounded-3xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-2 mb-4 ${vehicleNo ? 'bg-blue-600 shadow-blue-200 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
            onClick={() => alert(`Booking confirmed for ${vehicleNo} at ₹${totalPrice}!`)}
          >
            <span>Confirm & Pay ₹{totalPrice}</span>
          </button>

          <button 
            onClick={onClose}
            className="w-full text-gray-400 font-bold uppercase tracking-widest text-[10px] py-4 hover:text-gray-600 transition-colors"
          >
            Back to Listings
          </button>
          
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
            Secured by SpotFree Pay
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
