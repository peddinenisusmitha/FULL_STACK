import React, { useState } from "react";

function AdminCreateDrive() {
  const [driveName, setDriveName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [driveType, setDriveType] = useState("");
  const [itemsNeeded, setItemsNeeded] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDrive = {
      id: Date.now(),
      driveName,
      location,
      date,
      driveType,
      itemsNeeded,
      status: "Active",
    };

    const existingDrives =
      JSON.parse(localStorage.getItem("donationDrives")) || [];

    const updatedDrives = [...existingDrives, newDrive];

    localStorage.setItem("donationDrives", JSON.stringify(updatedDrives));

    setMessage("🎉 Donation Drive Created Successfully!");

    // Clear Form
    setDriveName("");
    setLocation("");
    setDate("");
    setDriveType("");
    setItemsNeeded("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "500px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ fontWeight: "bold", color: "#d63384" }}
        >
          🚀 Create Donation Drive
        </h2>

        {message && (
          <div className="alert alert-success text-center fw-bold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Drive Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Drive Name</label>
            <select
              className="form-select rounded-pill"
              value={driveName}
              onChange={(e) => setDriveName(e.target.value)}
              required
            >
              <option value="">Select Drive</option>
              <option value="Flood Relief 2026">Flood Relief 2026</option>
              <option value="Winter Blanket Drive">Winter Blanket Drive</option>
              <option value="Food for All Campaign">Food for All Campaign</option>
              <option value="Earthquake Emergency Support">
                Earthquake Emergency Support
              </option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label fw-bold">Location</label>
            <select
              className="form-select rounded-pill"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label fw-bold">Drive Date</label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Drive Type */}
          <div className="mb-3">
            <label className="form-label fw-bold">Drive Type</label>
            <select
              className="form-select rounded-pill"
              value={driveType}
              onChange={(e) => setDriveType(e.target.value)}
              required
            >
              <option value="">Select Drive Type</option>
              <option value="Food Donation">Food Donation</option>
              <option value="Clothing Donation">Clothing Donation</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Disaster Relief">Disaster Relief</option>
            </select>
          </div>

          {/* Items Needed */}
          <div className="mb-4">
            <label className="form-label fw-bold">Items Needed</label>
            <select
              className="form-select rounded-pill"
              value={itemsNeeded}
              onChange={(e) => setItemsNeeded(e.target.value)}
              required
            >
              <option value="">Select Item Type</option>
              <option value="Rice & Groceries">Rice & Groceries</option>
              <option value="Blankets">Blankets</option>
              <option value="Clothes">Clothes</option>
              <option value="Medicines">Medicines</option>
            </select>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn text-white fw-bold"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                borderRadius: "30px",
                padding: "10px",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.8")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              ✅ Create Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateDrive;