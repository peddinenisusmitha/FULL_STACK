import { useEffect, useState } from "react";

function RecipientDashboard({ userId }) {
  const [donations, setDonations] = useState([]);

  const loadDonations = () => {
    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];
    const myDonations = allDonations.filter(
      donation =>
        donation.donorId === userId && // Show only donations created by this donor
        (donation.status === "Approved" || donation.status === "Delivered")
    );
    setDonations(myDonations);
  };

  useEffect(() => {
    loadDonations();

    const handleStorageChange = event => {
      if (event.key === "donations") loadDonations();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userId]);

  return (
    <div className="container mt-4">
      <h3>My Donations</h3>
      {donations.length === 0 ? (
        <p>No approved or delivered donations yet.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.map(donation => (
              <tr key={donation.id}>
                <td>{donation.item}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      donation.status === "Approved"
                        ? "bg-primary"
                        : donation.status === "Delivered"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecipientDashboard;