import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerProfile({ volunteerId }) {

  const [profile, setProfile] = useState(null);
  const [distributedFoods, setDistributedFoods] = useState([]);

  useEffect(() => {

    if (!volunteerId) return;

    // Volunteer Profile
    axios
      .get(`http://localhost:5000/api/auth/volunteer/${volunteerId}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Distributed Food History
    axios
      .get(`http://localhost:5000/api/food/volunteer-history/${volunteerId}`)
      .then((res) => {
        setDistributedFoods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [volunteerId]);

  console.log(profile);

  if (!profile)
    return (
      <div className="bg-[#fefff4] rounded-xl p-6 border border-[#2d3b36]/10 text-center">
        <p
          className="text-[#525349] text-lg"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Loading...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">

      {/* NGO Profile Card */}
      <div className="bg-[#fefff4] rounded-2xl p-8 border border-[#2d3b36]/10 shadow-sm mb-8">

        {/* Header */}
        <div className="flex items-center gap-5 mb-4">

          <img
            src={
              profile.logoPath
                ? `http://localhost:5000${profile.logoPath}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt=""
            className="w-24 h-24 rounded-full object-cover border-2 border-[#2d3b36]/10"
          />

          <div>
            <h3
              className="text-3xl font-bold text-[#2d3b36] mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {profile.ngoName}
            </h3>

            <p
              className="text-[#525349]"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Making a difference every day 🌍
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mt-4">

          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <b className="text-[#2d3b36]">Representative:</b>{" "}
            {profile.representativeName}
          </p>

          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <b className="text-[#2d3b36]">Email:</b> {profile.email}
          </p>

          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <b className="text-[#2d3b36]">Contact:</b> {profile.contact}
          </p>

          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <b className="text-[#2d3b36]">Address:</b>{" "}
            {profile.location?.address || "Not available"}
          </p>

        </div>
      </div>

      {/* Distribution History */}
      <div className="bg-[#fefff4] rounded-2xl p-8 border border-[#2d3b36]/10 shadow-sm">

        <h2
          className="text-3xl font-bold text-[#2d3b36] mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ✅ Successfully Distributed Donations
        </h2>

        {distributedFoods.length === 0 ? (

          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            No distribution history yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {distributedFoods.map((food) => (

              <div
                key={food._id}
                className="border border-[#2d3b36]/10 rounded-xl overflow-hidden bg-white shadow-sm"
              >

                {food.proofImage && (
                  <img
                    src={`http://localhost:5000${food.proofImage}`}
                    alt=""
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-5">

                  <h3 className="text-2xl font-bold text-[#2d3b36] mb-2">
                    {food.name}
                  </h3>

                  <p className="text-[#525349] mb-2">
                    <b>Restaurant:</b> {food.restaurantName}
                  </p>

                  <p className="text-[#525349] mb-2">
                    <b>Quantity:</b> {food.quantity}
                  </p>

                  <p className="text-[#525349] mb-3">
                    <b>Message:</b>{" "}
                    {food.distributionMessage || "Food distributed successfully"}
                  </p>

                  <div className="bg-[#eff5e1] text-[#2d3b36] px-3 py-2 rounded-lg font-semibold inline-block">
                    Successfully Distributed
                  </div>

                </div>
              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function VolunteerProfile({ volunteerId }) {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     if (!volunteerId) return;
//     axios
//       .get(`https://food-donation-platform-4.onrender.com/volunteer/${volunteerId}`)
//       .then((res) => setProfile(res.data))
//       .catch(() => {});
//   }, [volunteerId]);

//   if (!profile)
//     return (
//       <div className="bg-[#fefff4] rounded-xl p-6 border border-[#2d3b36]/10 text-center">
//         <p
//           className="text-[#525349] text-lg"
//           style={{ fontFamily: "system-ui, sans-serif" }}
//         >
//           Loading...
//         </p>
//       </div>
//     );

//   return (
//     <div className="bg-[#fefff4] rounded-2xl p-8 border border-[#2d3b36]/10 max-w-3xl mx-auto shadow-sm">
//       {/* 🧾 Header */}
//       <div className="flex items-center gap-5 mb-4">
//         <img
//           src={
//             profile.logoPath
//               ? `http://localhost:5000${profile.logoPath}`
//               : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//           }
//           alt=""
//           className="w-24 h-24 rounded-full object-cover border-2 border-[#2d3b36]/10"
//         />
//         <div>
//           <h3
//             className="text-3xl font-bold text-[#2d3b36] mb-2"
//             style={{ fontFamily: "Georgia, serif" }}
//           >
//             {profile.ngoName}
//           </h3>
//           <p
//             className="text-[#525349]"
//             style={{ fontFamily: "system-ui, sans-serif" }}
//           >
//             Making a difference every day 🌍
//           </p>
//         </div>
//       </div>

//       {/* 🧩 Details */}
//       <div className="space-y-2 mt-4">
//         <p
//           className="text-[#525349]"
//           style={{ fontFamily: "system-ui, sans-serif" }}
//         >
//           <b className="text-[#2d3b36]">Representative:</b>{" "}
//           {profile.representativeName}
//         </p>
//         <p
//           className="text-[#525349]"
//           style={{ fontFamily: "system-ui, sans-serif" }}
//         >
//           <b className="text-[#2d3b36]">Email:</b> {profile.email}
//         </p>
//         <p
//           className="text-[#525349]"
//           style={{ fontFamily: "system-ui, sans-serif" }}
//         >
//           <b className="text-[#2d3b36]">Contact:</b> {profile.contact}
//         </p>
//         <p
//           className="text-[#525349]"
//           style={{ fontFamily: "system-ui, sans-serif" }}
//         >
//           <b className="text-[#2d3b36]">Address:</b>{" "}
//           {profile.location?.address || "Not available"}
//         </p>
//       </div>
//     </div>
//   );
// }
