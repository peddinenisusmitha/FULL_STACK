import { useEffect, useState } from "react";
import API from "../../api";

function AdminReports() {
  const [report, setReport] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await API.get("/donations");
      const donations = res.data;

      const total = donations.length;
      const pending = donations.filter(d => d.status === "Pending").length;
      const approved = donations.filter(d => d.status === "Approved").length;
      const delivered = donations.filter(d => d.status === "Delivered").length;

      setReport({ total, pending, approved, delivered });
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Styles ------------------

  const containerStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #43cea2, #185a9d)", // MATCHED DASHBOARD
  };

  const headingStyle = {
    textAlign: "center",
    color: "#fff",
    fontSize: "2.2rem",
    marginBottom: "30px",
    fontWeight: "bold",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    width: "350px",
    margin: "0 auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "0.3s",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
  };

  const statsContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const statBox = (bg) => ({
    background: bg,
    color: "#fff",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  });

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📊 Reports & Transparency</h2>

      <div
        style={cardStyle}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, cardHoverStyle)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, {
            transform: "translateY(0)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          })
        }
      >
        <div style={statsContainer}>
          <div style={statBox("linear-gradient(135deg, #6a11cb, #2575fc)")}>
            Total Donations: {report.total}
          </div>

          <div style={statBox("linear-gradient(135deg, #ff9800, #ffc107)")}>
            Pending: {report.pending}
          </div>

          <div style={statBox("linear-gradient(135deg, #00c853, #64dd17)")}>
            Approved: {report.approved}
          </div>

          <div style={statBox("linear-gradient(135deg, #0288d1, #03a9f4)")}>
            Delivered: {report.delivered}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;