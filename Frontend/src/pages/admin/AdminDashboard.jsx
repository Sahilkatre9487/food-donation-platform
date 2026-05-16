import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [restaurants, setRestaurants] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/admin/restaurants")
      .then((res) => setRestaurants(res.data));

    axios
      .get("http://localhost:5000/api/admin/volunteers")
      .then((res) => setVolunteers(res.data));

    axios
      .get("http://localhost:5000/api/admin/donations")
      .then((res) => setDonations(res.data));

  }, []);

  const deleteDonation = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/donation/${id}`
      );

      setDonations((prev) =>
        prev.filter((d) => d._id !== id)
      );

      alert("Donation deleted");

    } catch (err) {

      alert("Error deleting");

    }

  };

  return (

    <div className="p-8 bg-[#fefff4] min-h-screen">

      <h1 className="text-5xl font-bold mb-10 text-[#2d3b36]">
        Admin Dashboard
      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Restaurants
          </h2>

          <p className="text-5xl mt-4">
            {restaurants.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Volunteers
          </h2>

          <p className="text-5xl mt-4">
            {volunteers.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Donations
          </h2>

          <p className="text-5xl mt-4">
            {donations.length}
          </p>
        </div>

      </div>

      {/* DONATIONS */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-6">
          All Donations
        </h2>

        <div className="space-y-5">

          {donations.map((d) => (

            <div
              key={d._id}
              className="border p-5 rounded-xl"
            >

              <h3 className="text-2xl font-bold">
                {d.name}
              </h3>

              <p>{d.description}</p>

              <p>
                <b>Status:</b> {d.status}
              </p>

              <p>
                <b>Restaurant:</b> {d.restaurantName}
              </p>

              {d.proofImage && (
                <img
                  src={`http://localhost:5000${d.proofImage}`}
                  alt=""
                  className="w-52 mt-4 rounded-lg"
                />
              )}

              <button
                onClick={() => deleteDonation(d._id)}
                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}