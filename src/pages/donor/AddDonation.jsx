import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../api";

function AddDonation() {
  const navigate = useNavigate();
  const location = useLocation();

  const driveName =
    new URLSearchParams(location.search).get("drive");

  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Login first!");
      navigate("/login");
      return;
    }

    try {
      await API.post("/donations", {
        driveName,
        item: formData.item,
        quantity: formData.quantity,
        donorEmail: email,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      });

      alert("Donation Added!");
      navigate("/track-donations");
    } catch (err) {
      console.error(err);
      alert("Error adding donation");
    }
  };

  // ------------------ Styles ------------------

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    fontFamily: "Arial, sans-serif",
  };

  const formCard = {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    background: "#fff",
    cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff7e5f, #ff3f81)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHover = {
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  };

  return (
    <div style={containerStyle}>
      <form style={formCard} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>🎁 Add Donation</h2>

        {/* Dropdown for Item */}
        <select
          name="item"
          value={formData.item}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select Item</option>
          <option value="Clothes">Clothes</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Medicine">Medicine</option>
          <option value="Other">Other</option>
        </select>

        {/* Quantity Input */}
        <input
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          value={formData.quantity}
          style={inputStyle}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "none",
            })
          }
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default AddDonation;