import { useEffect, useState } from "react";

function AdminViewDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    const updated = stored.map((donation) =>
      donation.id === id ? { ...donation, status: newStatus } : donation
    );
    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
  };

  const hasPending = donations.some(
    (donation) => donation.status === "Pending"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1d2b64, #f8cdda)",
        padding: "40px 20px",
      }}
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: "20px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">
          📦 All Donations
        </h3>

        {donations.length === 0 ? (
          <p className="text-center">No donations available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  {hasPending && <th>Action</th>}
                </tr>
              </thead>

              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.item}</td>
                    <td>{donation.quantity}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          donation.status === "Pending"
                            ? "bg-warning"
                            : donation.status === "Approved"
                            ? "bg-primary"
                            : "bg-success"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>

                    {donation.status === "Pending" && (
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            updateStatus(donation.id, "Approved")
                          }
                        >
                          ✔ Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            updateStatus(donation.id, "Rejected")
                          }
                        >
                          ✖ Reject
                        </button>
                      </td>
                    )}
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

export default AdminViewDonations;