import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// -------- ADMIN PAGES --------
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateDrive from "./pages/admin/AdminCreateDrive";
import AdminViewDonations from "./pages/admin/AdminViewDonations";
import AdminReports from "./pages/admin/AdminReports";

// -------- DONOR PAGES --------
import DonorDashboard from "./pages/donor/DonorDashboard";
import AddDonation from "./pages/donor/AddDonation";
import TrackDonations from "./pages/donor/TrackDonations"; // ✅ Already Added

// -------- OTHER ROLES --------
import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
// ✅ RecipientDashboard removed

function App() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      <Routes>

        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------------- ADMIN ROUTES ---------------- */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-drive" element={<AdminCreateDrive />} />
        <Route path="/admin-donations" element={<AdminViewDonations />} />
        <Route path="/admin-reports" element={<AdminReports />} />

        {/* ---------------- DONOR ROUTES ---------------- */}
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/track-donations" element={<TrackDonations />} />

        {/* ---------------- LOGISTICS ROUTES ---------------- */}
        <Route path="/logistics" element={<LogisticsDashboard />} />

        {/* ✅ Recipient route removed */}

      </Routes>
    </>
  );
}

export default App;