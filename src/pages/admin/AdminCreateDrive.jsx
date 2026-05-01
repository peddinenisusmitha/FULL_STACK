import React, { useState } from "react";
import API from "../../api";

function AdminCreateDrive() {
  const [formData, setFormData] = useState({
    driveName: "",
    location: "",
    date: "",
    driveType: "",
    itemsNeeded: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/drives", {
        ...formData,
        status: "Active",
      });

      alert("🎉 Drive Created Successfully!");

      // reset form
      setFormData({
        driveName: "",
        location: "",
        date: "",
        driveType: "",
        itemsNeeded: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error creating drive");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glass Card */}
      <div
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
        }}
      >
        {/* Center Heading */}
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🚀 Create Drive
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Drive Name */}
          <select
            name="driveName"
            value={formData.driveName}
            onChange={handleChange}
            className="form-control mb-3"
            required
          >
            <option value="">Select Drive Name</option>
            <option value="Flood Relief 2026">Flood Relief 2026</option>
            <option value="Food for All">Food for All</option>
            <option value="Winter Clothes Drive">Winter Clothes Drive</option>
            <option value="Medical Help Camp">Medical Help Camp</option>
          </select>

          {/* Location */}
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control mb-3"
            required
          >
            <option value="">Select Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Nellore">Nellore</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Drive Type */}
          <select
            name="driveType"
            value={formData.driveType}
            onChange={handleChange}
            className="form-control mb-3"
            required
          >
            <option value="">Select Type</option>
            <option value="Food Donation">Food Donation</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical">Medical</option>
            <option value="Disaster Relief">Disaster Relief</option>
          </select>

          {/* Items Needed */}
          <select
            name="itemsNeeded"
            value={formData.itemsNeeded}
            onChange={handleChange}
            className="form-control mb-4"
            required
          >
            <option value="">Select Items</option>
            <option value="Rice & Groceries">Rice & Groceries</option>
            <option value="Blankets">Blankets</option>
            <option value="Clothes">Clothes</option>
            <option value="Medicines">Medicines</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "25px",
              border: "none",
              background: "linear-gradient(90deg, #ff512f, #dd2476)",
              color: "white",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            ✅ Create Drive
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateDrive;