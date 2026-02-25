import { useEffect, useState } from "react";

function AdminReports() {
  const [report, setReport] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  });

  useEffect(() => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const total = donations.length;
    const pending = donations.filter((d) => d.status === "Pending").length;
    const approved = donations.filter((d) => d.status === "Approved").length;
    const delivered = donations.filter((d) => d.status === "Delivered").length;

    setReport({ total, pending, approved, delivered });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8360c3, #2ebf91)",
        padding: "40px 20px",
      }}
    >
      <div className="container">
        <h3 className="text-center text-white mb-5 fw-bold">
          📊 Reports & Transparency
        </h3>

        <div className="row g-4">

          {/* Total */}
          <div className="col-md-3">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "20px",
              }}
            >
              <h5>Total</h5>
              <h2 className="fw-bold text-primary">{report.total}</h2>
            </div>
          </div>

          {/* Pending */}
          <div className="col-md-3">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "20px",
              }}
            >
              <h5>Pending</h5>
              <h2 className="fw-bold text-warning">{report.pending}</h2>
            </div>
          </div>

          {/* Approved */}
          <div className="col-md-3">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "20px",
              }}
            >
              <h5>Approved</h5>
              <h2 className="fw-bold text-success">{report.approved}</h2>
            </div>
          </div>

          {/* Delivered */}
          <div className="col-md-3">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "20px",
              }}
            >
              <h5>Delivered</h5>
              <h2 className="fw-bold text-info">{report.delivered}</h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminReports;