import React, { useEffect, useState } from "react";

function TrackDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const stored = JSON.parse(localStorage.getItem("donations")) || [];

    const myDonations = stored.filter(
      (donation) => donation.donorEmail === currentUser.email
    );

    setDonations(myDonations);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
      }}
    >
      <div className="container">
        <h2
          className="text-center mb-4"
          style={{ color: "white", fontWeight: "bold" }}
        >
          📊 Track Your Donations
        </h2>

        {donations.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            No donations made yet.
          </div>
        ) : (
          <div className="row">
            {donations.map((donation) => (
              <div className="col-md-4 mb-4" key={donation.id}>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    height: "100%",
                  }}
                >
                  <h5 style={{ color: "#007bff", fontWeight: "bold" }}>
                    {donation.driveName}
                  </h5>

                  <p>
                    <strong>📦 Item:</strong> {donation.item}
                  </p>

                  <p>
                    <strong>🔢 Quantity:</strong> {donation.quantity}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        donation.status === "Pending"
                          ? "bg-warning text-dark"
                          : donation.status === "Approved"
                          ? "bg-primary"
                          : "bg-success"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackDonations;