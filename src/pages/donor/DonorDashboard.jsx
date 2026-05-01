import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function DonorDashboard() {
  const navigate = useNavigate();

  const [drives, setDrives] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  });

  useEffect(() => {
    fetchDrives();
    fetchStats();
  }, []);

  // ✅ Get Drives
  const fetchDrives = async () => {
    try {
      const res = await API.get("/drives");
      const activeDrives = res.data.filter(d => d.status === "Active");
      setDrives(activeDrives);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Get Donation Stats
  const fetchStats = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      const res = await API.get("/donations");

      const userDonations = res.data.filter(
        (d) => d.donorEmail === email
      );

      const total = userDonations.length;
      const pending = userDonations.filter(d => d.status === "Pending").length;
      const approved = userDonations.filter(d => d.status === "Approved").length;
      const delivered = userDonations.filter(d => d.status === "Delivered").length;

      setStats({ total, pending, approved, delivered });

    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Styles ------------------

  const container = {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    fontFamily: "Arial",
  };

  const heading = {
    textAlign: "center",
    color: "#fff",
    fontSize: "2.2rem",
    marginBottom: "25px",
    fontWeight: "bold",
    letterSpacing: "1px",
  };

  // ✅ Improved Section Title
  const sectionTitle = {
    width: "100%",
    textAlign: "center",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#185a9d",
    background: "#ffffff",
    padding: "12px",
    borderRadius: "12px",
    margin: "20px 0 15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  };

  // ✅ Section Container (NEW)
  const sectionBox = {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto 30px",
    padding: "20px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
  };

  const grid = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  };

  const card = {
    background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    width: "260px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    transition: "0.3s",
  };

  const hover = {
    transform: "translateY(-6px)",
  };

  const btn = {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(45deg, #ff6a00, #ff3c00)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const statCard = {
    ...card,
    width: "280px",
  };

  const statText = {
    margin: "6px 0",
    fontWeight: "500",
  };

  // ------------------ UI ------------------

  return (
    <div style={container}>
      <h2 style={heading}>🎁 Donor Dashboard</h2>

      {/* 🔹 Drives Section */}
      <div style={sectionBox}>
        <h3 style={sectionTitle}>🚑 Available Drives</h3>

        <div style={grid}>
          {drives.map((d) => (
            <div
              key={d.id}
              style={card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hover)}
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { transform: "translateY(0)" })
              }
            >
              <h4>{d.driveName}</h4>
              <p>📍 {d.location || "N/A"}</p>
              <p>📅 {d.date}</p>

              <button
                style={btn}
                onClick={() =>
                  navigate(`/add-donation?drive=${d.driveName}`)
                }
              >
                Donate Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Actions Section */}
      <div style={sectionBox}>
        <h3 style={sectionTitle}>📊 Quick Actions</h3>

        <div style={grid}>
          {/* My Donations */}
          <div style={card}>
            <h4>📊 My Donations</h4>
            <button
              style={btn}
              onClick={() => navigate("/track-donations")}
            >
              View
            </button>
          </div>

          {/* Status */}
          <div style={statCard}>
            <h4>📦 Status Summary</h4>
            <p style={statText}>Total: {stats.total}</p>
            <p style={statText}>Pending: {stats.pending}</p>
            <p style={statText}>Approved: {stats.approved}</p>
            <p style={statText}>Delivered: {stats.delivered}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;