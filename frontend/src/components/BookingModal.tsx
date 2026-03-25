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
  if (!isOpen) return null;

  const totalPrice = hours * price;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
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
          <p className="text-gray-500 font-medium mb-6 text-center">Your slot <span className="text-blue-600 font-bold">{slotNumber}</span> is ready.</p>

          <div className="w-full bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Rate</span>
              <span className="text-gray-900 font-bold font-mono">₹{price}/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Duration</span>
              <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <button 
                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-r border-gray-200"
                  onClick={() => setHours(Math.max(1, hours - 1))}
                >-</button>
                <span className="px-4 py-1 text-gray-900 font-black min-w-[50px] text-center">{hours}h</span>
                <button 
                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-l border-gray-200"
                  onClick={() => setHours(Math.min(24, hours + 1))}
                >+</button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-900 font-black text-lg">Total</span>
              <span className="text-blue-600 font-black text-2xl">₹{totalPrice}</span>
            </div>
          </div>

          <button 
            className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
            onClick={() => alert(`Proceeding to pay ₹${totalPrice}...`)}
          >
            <span>Proceed to Pay</span>
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
