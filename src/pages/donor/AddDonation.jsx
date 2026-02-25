import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddDonation() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const driveName = queryParams.get("drive") || "General Drive";

  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];

    const donation = {
      id: new Date().getTime(),
      driveName: driveName,
      item: formData.item,
      quantity: formData.quantity,
      status: "Pending",
      donorEmail: currentUser.email,
      date: new Date().toLocaleDateString(),
    };

    allDonations.push(donation);
    localStorage.setItem("donations", JSON.stringify(allDonations));

    alert("🎉 Donation added successfully!");
    navigate("/track-donations");
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
      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "bold",
            color: "#6a11cb",
          }}
        >
          🎁 Add Donation
        </h2>

        <h5 className="text-center mb-3 text-muted">
          Drive: <span style={{ color: "#2575fc" }}>{driveName}</span>
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Item Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter item name"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
              style={{ padding: "10px 15px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Quantity</label>
            <input
              type="number"
              className="form-control rounded-pill"
              placeholder="Enter quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{ padding: "10px 15px" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(90deg, #ff512f, #dd2476)",
              borderRadius: "30px",
              padding: "10px",
              border: "none",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.opacity = "0.8")
            }
            onMouseOut={(e) =>
              (e.target.style.opacity = "1")
            }
          >
            🚀 Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDonation;