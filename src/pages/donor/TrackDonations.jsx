import React, { useEffect, useState } from "react";
import API from "../../api";

function TrackDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        alert("Please login first!");
        return;
      }

      // ✅ FIXED API CALL
      const res = await API.get("/donations");

      // ✅ FILTER USER DONATIONS
      const userDonations = res.data.filter(
        (d) => d.donorEmail === email
      );

      setDonations(userDonations);

    } catch (err) {
      console.error("Error fetching donations:", err);
      alert("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Styles ------------------

  const containerStyle = {
    minHeight: "100vh",
    padding: "30px 20px",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#fff",
    fontSize: "2rem",
    marginBottom: "25px",
    fontWeight: "bold",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "15px",
    padding: "20px",
    width: "280px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: "0.3s",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  };

  const textStyle = {
    fontSize: "0.95rem",
    color: "#444",
    margin: "8px 0",
  };

  const statusStyle = (status) => ({
    fontWeight: "bold",
    color:
      status === "Pending"
        ? "orange"
        : status === "Approved"
        ? "blue"
        : "green",
  });

  // ------------------ UI ------------------

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📊 My Donations</h2>

      {loading ? (
        <p style={{ color: "#fff", textAlign: "center" }}>Loading...</p>
      ) : donations.length === 0 ? (
        <p style={{ color: "#fff", textAlign: "center" }}>
          No donations found
        </p>
      ) : (
        <div style={gridStyle}>
          {donations.map((d) => (
            <div
              key={d.id}
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, cardHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "translateY(0)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                })
              }
            >
              <p style={textStyle}>
                <b>Item:</b> {d.item}
              </p>
              <p style={textStyle}>
                <b>Quantity:</b> {d.quantity}
              </p>
              <p style={textStyle}>
                <b>Status:</b>{" "}
                <span style={statusStyle(d.status)}>
                  {d.status}
                </span>
              </p>
              <p style={textStyle}>
                <b>Date:</b> {d.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackDonations;