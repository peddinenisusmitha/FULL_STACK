import { useEffect, useState } from "react";
import API from "../../api";

function AdminViewDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await API.get("/donations");
      setDonations(res.data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  // ✅ FIXED STATUS UPDATE (PATCH API)
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/donations/${id}/status`, {
        status: status,
      });

      // 🔥 Instant UI update (no reload needed)
      setDonations((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, status: status } : d
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ------------------ Styles ------------------

  const containerStyle = {
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#fff",
    fontSize: "2.2rem",
    marginBottom: "30px",
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
    width: "300px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: "0.3s",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  };

  const pStyle = {
    margin: "10px 0",
    fontSize: "1rem",
    color: "#333",
  };

  const statusStyle = (status) => ({
    fontWeight: "bold",
    color:
      status === "Approved"
        ? "green"
        : status === "Rejected"
        ? "red"
        : "orange",
  });

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  };

  const approveBtn = {
    background: "linear-gradient(135deg, #00c853, #64dd17)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const rejectBtn = {
    background: "linear-gradient(135deg, #ff1744, #ff616f)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📦 View Donations</h2>

      <div style={gridStyle}>
        {donations.map((d) => (
          <div
            key={d.id}
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              })
            }
          >
            <p style={pStyle}>
              <strong>Item:</strong> {d.item}
            </p>
            <p style={pStyle}>
              <strong>Quantity:</strong> {d.quantity}
            </p>
            <p style={pStyle}>
              <strong>Status:</strong>{" "}
              <span style={statusStyle(d.status)}>{d.status}</span>
            </p>

            {d.status === "Pending" && (
              <div style={buttonContainer}>
                <button
                  style={approveBtn}
                  onClick={() => updateStatus(d.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  style={rejectBtn}
                  onClick={() => updateStatus(d.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminViewDonations;