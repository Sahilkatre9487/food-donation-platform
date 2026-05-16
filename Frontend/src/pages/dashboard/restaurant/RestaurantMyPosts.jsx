import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react"; 
import { useNavigate } from "react-router-dom";// ✅ make sure you have lucide-react installed: npm install lucide-react

export default function RestaurantMyPosts({ restaurantId }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
  if (!restaurantId) return;

  axios
    .get(`http://localhost:5000/api/food/restaurant/${restaurantId}`)
    .then((res) => setPosts(res.data))
    .catch((err) => console.error(err));

}, [restaurantId]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fefff4] p-6 rounded-2xl shadow-sm border border-[#2d3b36]/10">
          <div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#2d3b36] mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              My Posts
            </h1>
            <p
              className="text-[#525349] text-base sm:text-lg font-semibold"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Manage and track your food donations
            </p>
          </div>

          <button
            className="flex items-center gap-2 bg-[#2d3b36] text-[#fefff4] px-6 py-3 rounded-xl hover:bg-[#2d3b36]/90 transition-all duration-200 shadow-md hover:shadow-lg font-bold text-lg"
            onClick={() => navigate("/dashboard/restaurant/create")}
          >
            <Plus size={24} />
            New Post
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-[#525349] col-span-full text-lg font-semibold">
            No posts yet. Create your first donation post!
          </p>
        ) : (
          posts.map((p) => (
            <div
              key={p._id}
              className="bg-[#fefff4] rounded-lg shadow-md overflow-hidden border border-[#2d3b36]/10 hover:shadow-lg transition-shadow"
            >
              {p.imagePath && (
                <img
                 src={`http://localhost:5000${p.imagePath}`}
                  alt=""
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h4 className="text-2xl font-extrabold text-[#2d3b36] mb-3">
                  {p.name}
                </h4>
                <p className="text-[#525349] mb-4 line-clamp-3 text-lg font-semibold">
                  {p.description}
                </p>
                <div className="space-y-2 text-lg">
                  <p className="text-[#525349] font-semibold">
                    <span className="font-bold text-[#2d3b36]">Quantity:</span>{" "}
                    {p.quantity}
                  </p>
                  <p className="text-[#525349] font-semibold">
                    <span className="font-bold text-[#2d3b36]">Location:</span>{" "}
                    {p.location?.address || `${p.location?.lat}, ${p.location?.lng}`}
                  </p>
                  <p className="text-[#525349] font-semibold">
                    <span className="font-bold text-[#2d3b36]">Status:</span>{" "}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                        p.status === "Accepted"
                          ? "bg-[#f8fee5] text-[#2d3b36]"
                          : "bg-[#eff5e1] text-[#525349]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </p>
                  {p.status === "Accepted" && (
  <p className="text-[#2d3b36] bg-[#f8fee5] px-3 py-2 rounded-md mt-3 flex items-center gap-2 font-semibold text-lg">
    <span>✅</span>
    <span>
      Accepted by{" "}
      <span className="font-bold">{p.acceptedByName}</span>
    </span>
  </p>
)}

{p.status === "Distributed" && (
  <div className="mt-4 bg-[#eff5e1] p-4 rounded-xl">

    <p className="font-bold text-[#2d3b36] mb-3 text-lg">
      ✅ Food Successfully Distributed
    </p>

    {p.proofImage && (
      <img
        src={`http://localhost:5000${p.proofImage}`}
        alt="Distribution Proof"
        className="w-full h-52 object-cover rounded-lg mb-3"
      />
    )}

    <p className="text-[#525349] font-semibold">
      <span className="text-[#2d3b36] font-bold">
        Distributed By:
      </span>{" "}
      {p.acceptedByName}
    </p>

    <p className="text-[#525349] mt-2">
      <span className="font-bold text-[#2d3b36]">
        Message:
      </span>{" "}
      {p.distributionMessage}
    </p>

    <p className="text-sm text-[#525349] mt-2">
      {new Date(p.distributedAt).toLocaleString()}
    </p>

  </div>
)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
