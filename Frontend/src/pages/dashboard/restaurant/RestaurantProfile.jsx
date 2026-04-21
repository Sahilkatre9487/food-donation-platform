import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantProfile({ restaurantId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;
    axios.get(`http://localhost:5000/restaurant/${restaurantId}`)
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [restaurantId]);

  if (!profile) 
    return (
      <div className="bg-[#fefff4] rounded-xl p-6 border border-[#2d3b36]/10">
        <p className="text-[#525349]" style={{ fontFamily: "system-ui, sans-serif" }}>
          Loading...
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div
        className="rounded-lg shadow-md p-8 mb-4"
        style={{
          backgroundColor: "#fefff4",
          borderColor: "#2d3b36",
          borderWidth: "1px",
        }}
      >
        <h3
          className="text-2xl font-semibold mb-2"
          style={{ color: "#2d3b36", fontFamily: "Inter, sans-serif" }}
        >
          Restaurant Profile
        </h3>
        <p
          className="mb-6"
          style={{ color: "#525349", fontFamily: "Inter, sans-serif" }}
        >
          Here’s your restaurant profile overview including all your details such as
          contact information, owner name, and address.
        </p>

        {/* Profile Content */}
        <div className="bg-[#fefff4] rounded-xl p-6 border border-[#2d3b36]/10 max-w-3xl">
          <div className="flex gap-3 items-center">
            <img
              src={
                profile.imagePath
                  ? `http://localhost:5000${profile.imagePath}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt=""
              className="w-24 h-24 rounded-full object-cover border-2 border-[#2d3b36]/10"
            />
            <div>
              <h3
                className="text-2xl font-bold text-[#2d3b36] mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {profile.restaurantName}
              </h3>
              <p
                className="text-[#525349] mb-1"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <b className="text-[#2d3b36]">Owner:</b> {profile.ownerName}
              </p>
              <p
                className="text-[#525349] mb-1"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <b className="text-[#2d3b36]">Email:</b> {profile.email}
              </p>
              <p
                className="text-[#525349] mb-1"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <b className="text-[#2d3b36]">Contact:</b> {profile.contact}
              </p>
              <p
                className="text-[#525349]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <b className="text-[#2d3b36]">Address:</b>{" "}
                {profile.location?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
