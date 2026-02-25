import { useEffect, useState } from "react";

function LogisticsDashboard() {
  const [donations, setDonations] = useState([]);

  const loadDonations = () => {
    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];
    const visibleDonations = allDonations.filter(
      (donation) =>
        donation.status === "Approved" ||
        donation.status === "Delivered"
    );
    setDonations(visibleDonations);
  };

  useEffect(() => {
    loadDonations();

    const handleStorageChange = (event) => {
      if (event.key === "donations") loadDonations();
    };

    window.addEventListener("storage", handleStorageChange);

    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const markDelivered = (id) => {
    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];
    const updatedAll = allDonations.map((donation) =>
      donation.id === id
        ? { ...donation, status: "Delivered" }
        : donation
    );
    localStorage.setItem("donations", JSON.stringify(updatedAll));
    loadDonations();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6a00, #ee0979)",
        padding: "40px 20px",
      }}
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: "20px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">
          🚚 Logistics Dashboard
        </h3>

        {donations.length === 0 ? (
          <p className="text-center">
            No approved or delivered donations available.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Status / Action</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="fw-bold">{donation.item}</td>
                    <td>{donation.quantity}</td>
                    <td>
                      {donation.status === "Approved" ? (
                        <button
                          className="btn btn-primary btn-sm px-3"
                          style={{
                            borderRadius: "20px",
                            background:
                              "linear-gradient(90deg, #36d1dc, #5b86e5)",
                            border: "none",
                          }}
                          onClick={() =>
                            markDelivered(donation.id)
                          }
                        >
                          📦 Mark Delivered
                        </button>
                      ) : (
                        <span className="badge bg-success px-3 py-2">
                          ✅ Delivered
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogisticsDashboard;