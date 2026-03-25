"use client";

import { useState } from "react";
import { Search, MapPin, Navigation, Clock, User, Bell } from "lucide-react";
import Map from "@/components/Map";
import ParkingCard from "@/components/ParkingCard";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState({ name: "", price: 0 });
  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");

  const parkingSpots = [
    { name: "DLF Cyber Hub P3", address: "Cyber City, Gurugram", distance: "450m", price: 120, available: 24, rating: 4.8 },
    { name: "Ambience Mall South", address: "NH-8, Gurugram", distance: "1.2km", price: 80, available: 15, rating: 4.5 },
    { name: "IFFCO Chowk Public", address: "Sector 28, Gurugram", distance: "2.5km", price: 40, available: 3, rating: 3.9 },
  ];

  const filteredSpots = parkingSpots.filter(spot => 
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    spot.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (name: string, price: number) => {
    setSelectedSpot({ name, price });
    setIsModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex justify-between items-center rounded-b-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h1" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M12 2v4" />
              <path d="M10 4h4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter leading-none">SpotFree</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              {activeTab === "explore" ? "Premium Parking" : activeTab === "history" ? "Your Bookings" : "User Profile"}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 bg-gray-100 rounded-full text-gray-600">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-blue-600 rounded-full text-white shadow-lg" onClick={() => setActiveTab("profile")}>
            <User size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 mt-6">
        {activeTab === "explore" && (
          <>
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search destination..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-0 rounded-2xl py-4 pl-12 pr-4 shadow-md focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-800"
              />
            </div>

            {/* Map Section */}
            <Map />

                  {/* Nearby Header */}
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="text-lg font-extrabold text-gray-900">Nearby Spots</h2>
              <button className="text-blue-600 text-xs font-bold uppercase tracking-widest">View Map</button>
            </div>

            {/* Parking List */}
            <div className="space-y-4 mb-10">
              {filteredSpots.map((spot, idx) => (
                <div key={idx} onClick={() => handleBookClick(spot.name, spot.price)}>
                  <ParkingCard {...spot} />
                </div>
              ))}
              {filteredSpots.length === 0 && (
                <p className="text-center text-gray-400 py-10 font-bold">No parking spots found.</p>
              )}
            </div>

            {/* Testimonials Section */}
            <div className="mb-10">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-1">What our community says</h2>
              <div className="flex space-x-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar">
                {[
                  { name: "Sarah K.", text: '"Found the perfect spot near Wembley for the concert. Half the price of official parking and super easy to book!"', rating: 5 },
                  { name: "James T.", text: '"As a host, I\'ve earned over ₹25,000 from my unused driveway. The platform makes it so simple to manage bookings."', rating: 5 },
                  { name: "Emma R.", text: '"Saved so much time and stress finding parking near the hospital for my appointments. Will definitely use again."', rating: 5 }
                ].map((testimonial, idx) => (
                  <div key={idx} className="min-w-[280px] bg-white p-6 rounded-3xl shadow-md border border-gray-50 flex flex-col justify-between">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        {testimonial.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                        <div className="flex text-orange-400">
                          {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-[10px]">★</span>)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs italic leading-relaxed">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Clock size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Booking History</h3>
            <p className="text-gray-500 text-sm mt-2">Your past and upcoming parking bookings will appear here.</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="mt-4">
            <div className="bg-white rounded-3xl p-6 shadow-md mb-6 flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-black">JD</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">+91 98765 43210</p>
              </div>
            </div>
            <div className="space-y-3">
              {['Payments', 'Vehicles', 'Help & Support', 'Settings'].map((item) => (
                <button key={item} className="w-full bg-white p-5 rounded-2xl shadow-sm text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-gray-800">{item}</span>
                  <span className="text-gray-300 text-xl">›</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nav Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-2xl">
        <button 
          className={`flex flex-col items-center ${activeTab === "explore" ? "text-blue-600" : "text-gray-400"}`}
          onClick={() => setActiveTab("explore")}
        >
          <Navigation size={22} /><span className="text-[10px] font-bold mt-1 uppercase">Explore</span>
        </button>
        <button 
          className={`flex flex-col items-center ${activeTab === "history" ? "text-blue-600" : "text-gray-400"}`}
          onClick={() => setActiveTab("history")}
        >
          <Clock size={22} /><span className="text-[10px] font-bold mt-1 uppercase">History</span>
        </button>
        <button 
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-blue-600" : "text-gray-400"}`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={22} /><span className="text-[10px] font-bold mt-1 uppercase">Profile</span>
        </button>
      </div>

      {/* Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        parkingName={selectedSpot.name} 
        slotNumber="A-102" 
        price={selectedSpot.price} 
      />
    </main>
  );
}
