import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DonorDashboard() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const storedDrives =
      JSON.parse(localStorage.getItem("donationDrives")) || [];
    const activeDrives = storedDrives.filter(
      (drive) => drive.status === "Active"
    );
    setDrives(activeDrives);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to right, #36d1dc, #5b86e5)",
      }}
    >
      <div className="container">

        {/* Dashboard Title */}
        <h2
          className="mb-4 text-center"
          style={{ color: "white", fontWeight: "bold" }}
        >
          Donor Dashboard
        </h2>

        <h4 className="mb-4 text-center" style={{ color: "#fff3cd" }}>
          🔥 Active Donation Drives
        </h4>

        {drives.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            No active drives available right now.
          </div>
        ) : (
          <div className="row">
            {drives.map((drive) => (
              <div className="col-md-4 mb-4" key={drive.id}>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h5 style={{ color: "#007bff", fontWeight: "bold" }}>
                    {drive.driveName}
                  </h5>

                  <p>
                    <strong>📍 Location:</strong> {drive.location}
                  </p>
                  <p>
                    <strong>📅 Date:</strong> {drive.date}
                  </p>
                  <p>
                    <strong>📦 Items Needed:</strong> {drive.itemsNeeded}
                  </p>

                  <Link
                    to={`/add-donation?drive=${drive.driveName}`}
                    className="btn btn-primary btn-sm mt-auto"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="my-4" style={{ borderColor: "white" }} />

        <div className="text-center">
          <Link
            to="/track-donations"
            className="btn btn-warning px-4"
          >
            Track My Donations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;