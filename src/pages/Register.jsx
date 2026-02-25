import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // no default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Role validation
    if (formData.role === "") {
      alert("Please select a role!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (userExists) {
      alert("Email already registered!");
      return;
    }

    if (formData.role === "recipient") {
      alert("Recipient role is no longer allowed!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #43cea2, #185a9d)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "400px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* ✅ Select Role Dropdown */}
          <select
            className="form-control mb-3"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="logistics">Logistics</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;