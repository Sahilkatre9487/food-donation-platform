import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function RestaurantFoodForm({ restaurantId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) =>
        setPosition([pos.coords.latitude, pos.coords.longitude])
      );
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("restaurantId", restaurantId);
      data.append("name", name);
      data.append("description", description);
      data.append("quantity", quantity);
      if (image) data.append("image", image);
      if (position) {
        data.append("latitude", position[0]);
        data.append("longitude", position[1]);
      }

      await axios.post("http://localhost:5000/api/food/create", data);
      alert("Posted successfully!");
      setName("");
      setDescription("");
      setQuantity("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error posting");
    }
  };

  const inputStyle = {
    backgroundColor: "#eff5e1",
    borderColor: "#2d3b36",
    color: "#2d3b36",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const labelStyle = {
    color: "#2d3b36",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fefff4] p-6 rounded-2xl shadow-sm border border-[#2d3b36]/10">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#2d3b36] mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Post Food
            </h1>
            <p
              className="text-[#525349] text-sm sm:text-base"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Share surplus food with your community and help reduce waste
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="rounded-lg shadow-md p-8 mb-4"
        style={{
          backgroundColor: "#fefff4",
          borderColor: "#2d3b36",
          borderWidth: "1px",
        }}
      >
        <form onSubmit={submit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2" style={labelStyle}>
                Food Name
              </label>
              <input
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 transition-all"
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter food name"
                required
              />
            </div>

            <div>
              <label className="block mb-2" style={labelStyle}>
                Quantity / Portions
              </label>
              <input
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 transition-all"
                style={inputStyle}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2" style={labelStyle}>
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 transition-all resize-none"
              style={inputStyle}
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the food"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2" style={labelStyle}>
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 rounded border file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium cursor-pointer"
              style={inputStyle}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2" style={labelStyle}>
              Pick Location
            </label>
            <p className="text-sm mb-3" style={{ color: "#525349", fontFamily: "Inter, sans-serif" }}>
              Click on the map to set your pickup location
            </p>
            <div className="rounded overflow-hidden border" style={{ height: 300, borderColor: "#2d3b36" }}>
              <MapContainer center={position || [11, 78]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker position={position} setPosition={setPosition} />
                {position && <Marker position={position}></Marker>}
              </MapContainer>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-3 rounded font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "#2d3b36",
                color: "#fefff4",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              type="submit"
            >
              Post Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
