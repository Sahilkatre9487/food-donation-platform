import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerFoodList({ volunteerId }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/food/all")
      .then((res) => setFoods(res.data))
      .catch(() => {});
  }, []);

  const accept = async (id) => {
    try {
    await axios.post(
  `http://localhost:5000/api/food/accept/${id}`,
  { volunteerId }
);

      alert("Accepted");
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error accepting");
    }
  };

  return (
    <div className="min-h-screen bg-[#fefff4] p-6 md:p-10">
      {/* 🌿 Header Section */}
      <div className="bg-[#eff5e1] p-6 md:p-10 rounded-2xl shadow-sm mb-10 border border-[#2d3b36]/10 text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#2d3b36] mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          🍽️ Available Food Donations
        </h1>
        <p
          className="text-[#525349] text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Explore fresh food donations shared by restaurants.  
          Accept what you can collect and help reduce food waste.
        </p>
      </div>

      {/* 🧺 Food Cards Section */}
      <div className="max-w-7xl mx-auto">
        {foods.length === 0 ? (
          <p
            className="text-center text-[#525349] text-lg"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            No food available right now. Please check back later 🍛
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(foods) && foods.map((f) => (
              <div
                key={f._id}
                className="bg-[#fefff4] rounded-2xl overflow-hidden border border-[#2d3b36]/10 hover:shadow-lg transition-shadow"
              >
                {f.imagePath && (
                  <img
                    src={`http://localhost:5000${f.imagePath}`}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h4
                    className="text-2xl font-bold text-[#2d3b36] mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {f.name}
                  </h4>
                  <p
                    className="text-[#525349] mb-3 text-sm leading-relaxed line-clamp-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {f.description}
                  </p>
                  <p
                    className="text-[#525349] mb-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <b className="text-[#2d3b36]">Quantity:</b> {f.quantity}
                  </p>
                  <p
                    className="text-[#525349] mb-5"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <b className="text-[#2d3b36]">Restaurant:</b>{" "}
                    {f.restaurantName}
                  </p>
                  <button
                    className="w-full bg-[#2d3b36] text-[#fefff4] py-2.5 rounded-lg font-semibold hover:bg-[#2d3b36]/90 transition-colors"
                    onClick={() => accept(f._id)}
                  >
                    Accept Donation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
