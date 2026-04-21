// client/src/pages/dashboard/volunteer/VolunteerMap.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// custom marker icon
const foodIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
  iconSize: [35, 35],
});

export default function VolunteerMap() {
  const [foodPosts, setFoodPosts] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food/all");
        setFoodPosts(res.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="h-screen w-full p-2.5 bg-[#eff5e1]">
      <h2 
        className="text-center mb-2.5 text-3xl font-bold text-[#2d3b36]" 
        style={{ fontFamily: 'Georgia, serif' }}
      >
        📍 Restaurant Food Locations
      </h2>
      <MapContainer
        center={[20.5937, 78.9629]} // India center
        zoom={5}
        style={{ height: "90%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {foodPosts.map((food) =>
          food.location && food.location.lat && food.location.lng ? (
            <Marker
              key={food._id}
              position={[food.location.lat, food.location.lng]}
              icon={foodIcon}
            >
              <Popup>
                <div className="text-center">
                  <img
                    src={`https://food-donation-platform-4.onrender.com${food.imagePath}`}
                    alt="food"
                    className="w-25 rounded-lg mb-2 mx-auto"
                  />
                  <h3 className="text-lg font-bold text-[#2d3b36] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {food.name}
                  </h3>
                  <p className="text-[#525349] mb-1 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    🍴 <strong className="text-[#2d3b36]">Type:</strong> {food.description}
                  </p>
                  <p className="text-[#525349] mb-1 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    🏠 <strong className="text-[#2d3b36]">Restaurant:</strong> {food.restaurantName}
                  </p>
                  <p className="text-[#525349] mb-1 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    📍 <strong className="text-[#2d3b36]">Address:</strong> {food.location.address || "Not available"}
                  </p>
                  <p className="text-[#525349] mb-1 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    ⏰ <strong className="text-[#2d3b36]">Time:</strong> {food.time || "N/A"}
                  </p>
                  <p className="text-[#525349] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    📦 <strong className="text-[#2d3b36]">Status:</strong> {food.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}