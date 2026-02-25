import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
        padding: "40px 20px",
      }}
    >
      <div className="container">
        <h2
          className="text-center mb-5 text-white"
          style={{
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          ⚙️ Admin Dashboard
        </h2>

        <div className="row g-4">

          {/* Create Drive */}
          <div className="col-md-4">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h1>🚀</h1>
              <h5 className="fw-bold mt-2">Create Donation Drive</h5>
              <p className="text-muted">
                Start a new relief or emergency campaign.
              </p>

              <button
                className="btn text-white fw-bold mt-3"
                style={{
                  background: "linear-gradient(90deg, #ff512f, #dd2476)",
                  borderRadius: "30px",
                  border: "none",
                  padding: "8px 20px",
                }}
                onClick={() => navigate("/create-drive")}
              >
                Create Drive
              </button>
            </div>
          </div>

          {/* View Donations */}
          <div className="col-md-4">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h1>📦</h1>
              <h5 className="fw-bold mt-2">View All Donations</h5>
              <p className="text-muted">
                Approve, reject or mark deliveries.
              </p>

              <button
                className="btn text-white fw-bold mt-3"
                style={{
                  background: "linear-gradient(90deg, #11998e, #38ef7d)",
                  borderRadius: "30px",
                  border: "none",
                  padding: "8px 20px",
                }}
                onClick={() => navigate("/admin-donations")}
              >
                View Donations
              </button>
            </div>
          </div>

          {/* Reports */}
          <div className="col-md-4">
            <div
              className="card text-center p-4 shadow-lg"
              style={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h1>📊</h1>
              <h5 className="fw-bold mt-2">Reports & Transparency</h5>
              <p className="text-muted">
                View donation statistics and summaries.
              </p>

              <button
                className="btn text-dark fw-bold mt-3"
                style={{
                  background: "linear-gradient(90deg, #f7971e, #ffd200)",
                  borderRadius: "30px",
                  border: "none",
                  padding: "8px 20px",
                }}
                onClick={() => navigate("/admin-reports")}
              >
                View Reports
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;