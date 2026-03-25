"use client";

import { useState } from "react";
import { Search, Navigation, Clock, User, Bell, Plus, ChevronRight, LogOut } from "lucide-react";
import Map from "@/components/Map";
import ParkingCard from "@/components/ParkingCard";
import BookingModal from "@/components/BookingModal";
import HostRegistrationModal from "@/components/HostRegistrationModal";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHostMode, setIsHostMode] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState({ name: "", price: 0 });
  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");

  const [parkingSpots, setParkingSpots] = useState([
    { name: "DLF Cyber Hub P3", address: "Cyber City, Gurugram", distance: "450m", price: 120, available: 24, rating: 4.8 },
    { name: "Ambience Mall South", address: "NH-8, Gurugram", distance: "1.2km", price: 80, available: 15, rating: 4.5 },
    { name: "IFFCO Chowk Public", address: "Sector 28, Gurugram", distance: "2.5km", price: 40, available: 3, rating: 3.9 },
  ]);

  const addLot = (newLot: any) => {
    setParkingSpots([newLot, ...parkingSpots]);
  };

  const filteredSpots = parkingSpots.filter(spot => 
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    spot.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (name: string, price: number) => {
    setSelectedSpot({ name, price });
    setIsModalOpen(true);
  };

  const handleLoginSubmit = () => {
    if (phone.length === 10 && name.trim().length > 2) {
      setShowOtpInput(true);
    } else {
      alert("Please enter a valid Name and 10-digit Phone connection.");
    }
  };

  const handleOtpVerify = () => {
    if (otp.join("") === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid OTP! Try 1234.");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen flex-col bg-white p-8 justify-center items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h1" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">SpotFree</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Premium Parking Experience</p>
        </div>

        <div className="w-full max-w-sm">
          {!showOtpInput ? (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-500 font-medium text-sm">Join the community to find and host spots.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center shadow-sm">
                  <User size={20} className="text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-bold text-lg"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center shadow-sm">
                  <span className="text-gray-400 font-black mr-3">+91</span>
                  <input 
                    type="tel" 
                    placeholder="9876543210" 
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="bg-transparent border-0 flex-1 focus:ring-0 text-gray-900 font-black text-xl"
                  />
                </div>
              </div>

              <button 
                onClick={handleLoginSubmit}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 mb-2">OTP Sent!</h2>
                <p className="text-gray-500 font-medium">Hello <span className="text-blue-600 font-black">{name}</span>, verify your phone.</p>
              </div>

              <div className="flex justify-between px-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.nextSibling && e.target.value) (e.target.nextSibling as HTMLInputElement).focus();
                    }}
                    className="w-14 h-14 bg-gray-50 border-2 border-gray-100 focus:border-blue-600 focus:ring-0 rounded-2xl text-center text-2xl font-black text-gray-900"
                  />
                ))}
              </div>

              <button 
                onClick={handleOtpVerify}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Verify & Join
              </button>
              
              <button 
                onClick={() => setShowOtpInput(false)}
                className="w-full text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-blue-600 transition-colors"
              >
                Change Details
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg ring-4 ring-blue-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.5 13.5H12V16H10V8H14.5C15.8807 8 17 9.11929 17 10.5C17 11.8807 15.8807 13.5 14.5 13.5H15.5Z" fill="white"/>
          <path d="M12 13.5H14.5C15.8807 13.5 17 12.3807 17 11C17 9.61929 15.8807 8.5 14.5 8.5H10V13.5H12Z" fill="white" fillOpacity="0.3"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black text-gray-900 leading-tight tracking-tight">Spot<span className="text-blue-600">Free</span></span>
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">Premium Parking</span>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pb-20">
      {/* Header with Extreme Priority & Glass Effect */}
      <div className="bg-white/80 backdrop-blur-xl px-6 pt-12 pb-6 shadow-sm flex justify-between items-center rounded-b-[40px] sticky top-0 z-[2000] border-b border-white/20">
        <div className="flex flex-col">
          <Logo />
          {isHostMode && (
             <div className="mt-2 flex items-center">
              <span className="bg-green-100 text-green-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-200">Host Dashboard</span>
             </div>
          )}
        </div>
        <div className="flex space-x-3">
          <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-600 transition-colors">
            <Bell size={20} />
          </button>
          <button 
            className={`p-3 rounded-2xl transition-all shadow-lg ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white text-gray-400 border border-gray-100'}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 mt-6">
        {isHostMode ? (
          <div className="animate-slide-up">
            <div className="bg-green-600 text-white p-8 rounded-3xl shadow-xl mb-8 flex flex-col items-center">
              <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-center w-full">Current Revenue</span>
              <h2 className="text-4xl font-black mb-1">₹0.00</h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Active Bookings: 0</p>
            </div>
            
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-1">Host Settings</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Pricing 💸', desc: 'Set hourly rates' },
                { label: 'Slots 🧩', desc: 'Configure blocks' },
                { label: 'Rules 📜', desc: 'Terms & Entry' },
                { label: 'Insights 📈', desc: 'Revenue' }
              ].map((item, idx) => (
                <button key={idx} className="bg-white p-5 rounded-[28px] shadow-md border border-gray-50 text-left hover:border-green-500 transition-all active:scale-95 group">
                  <p className="font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{item.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{item.desc}</p>
                </button>
              ))}
            </div>

            <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-1">Your Listed Slots</h2>
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-center mb-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Plus size={32} className="text-green-600" />
              </div>
              <p className="text-gray-400 font-bold text-sm">Listing your first spot earns you ₹500 joining bonus!</p>
              <button 
                onClick={() => setIsHostModalOpen(true)}
                className="mt-6 bg-green-600 text-white font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-green-700 transition-all active:scale-95"
              >
                Add Your Location
              </button>
            </div>
            
            <button 
              onClick={() => setIsHostMode(false)}
              className="w-full border-2 border-gray-200 text-gray-400 font-black py-4 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all uppercase tracking-widest text-[10px]"
            >
              Back to Booking
            </button>
          </div>
        ) : (
          <>
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
              <div className="mt-4 animate-slide-up pb-24">
                <div className="bg-white rounded-[32px] p-8 shadow-md mb-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-black mb-4 shadow-xl border-4 border-white">
                    {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{name || 'User'}</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">+91 {phone}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-500 p-8 rounded-[32px] shadow-xl mb-10 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-white font-black text-2xl mb-2">Switch to Hosting</h4>
                    <p className="text-white/80 text-sm font-medium mb-6">Earn up to ₹15,000/month by listing your empty parking slot.</p>
                    <button 
                      onClick={() => setIsHostMode(true)}
                      className="bg-white text-green-600 font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-gray-50 transition-all active:scale-95"
                    >
                      Start Earning
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {['Payments', 'Vehicles', 'Help & Support', 'Settings'].map((menuItem) => (
                    <button key={menuItem} className="w-full bg-white p-5 rounded-2xl shadow-sm border border-transparent text-left flex justify-between items-center hover:shadow-md hover:border-blue-100 transition-all">
                      <span className="font-bold text-gray-800 text-lg">{menuItem}</span>
                      <ChevronRight size={20} className="text-gray-300" />
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => {
                        setIsLoggedIn(false);
                        setIsHostMode(false);
                        setName("");
                        setPhone("");
                        setOtp(["", "", "", ""]);
                        setShowOtpInput(false);
                        setActiveTab("explore");
                    }}
                    className="w-full bg-red-50 p-5 rounded-2xl shadow-sm text-left flex justify-between items-center hover:bg-red-100 transition-all group mt-6"
                  >
                    <div className="flex items-center space-x-3 text-red-600">
                      <LogOut size={20} />
                      <span className="font-black text-lg">Log Out</span>
                    </div>
                    <ChevronRight size={20} className="text-red-200 group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Nav Bar (Sticky Bottom) */}
      {!isHostMode && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-2xl">
          <button 
            className={`flex flex-col items-center ${activeTab === "explore" ? "text-blue-600" : "text-gray-400"}`}
            onClick={() => setActiveTab("explore")}
          >
            <Navigation size={22} /><span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Explore</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === "history" ? "text-blue-600" : "text-gray-400"}`}
            onClick={() => setActiveTab("history")}
          >
            <Clock size={22} /><span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">History</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeTab === "profile" ? "text-blue-600" : "text-gray-400"}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={22} /><span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Profile</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        parkingName={selectedSpot.name} 
        slotNumber="A-102" 
        price={selectedSpot.price} 
      />

      <HostRegistrationModal 
        isOpen={isHostModalOpen} 
        onSuccess={addLot}
        onClose={() => setIsHostModalOpen(false)} 
      />
    </main>
  );
}
