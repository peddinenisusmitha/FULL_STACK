import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  // ✅ Check login status when component loads
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Donation App
      </Link>

      <div>
        {!loggedInUser ? (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-warning" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;