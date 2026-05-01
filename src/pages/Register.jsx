import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const getRegisterErrorMessage = (err) => {
  const status = err.response?.status;
  const responseData = err.response?.data;

  if (status === 409) {
    return "This email is already registered. Please login or use a different email.";
  }

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.errors) {
    const errors = Array.isArray(responseData.errors)
      ? responseData.errors
      : Object.values(responseData.errors);

    return errors.flat().join("\n");
  }

  if (status === 400) {
    return "Registration details were rejected by the server. Please check name, email, password, and role.";
  }

  if (status === 500) {
    return "Server error while processing OTP. Please check the Spring Boot console logs and email/SMTP configuration.";
  }

  if (responseData?.error && status) {
    return `${responseData.error} (HTTP ${status}). Check the backend console for the exact validation error.`;
  }

  if (status) {
    return `Registration failed with HTTP ${status}. Check the Spring Boot console for the exact error.`;
  }

  return err.message || "Registration failed. Please try again.";
};

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [otpMessage, setOtpMessage] = useState({
    type: "secondary",
    text: "Enter your email, then send and verify OTP.",
  });

  const normalizedEmail = formData.email.trim().toLowerCase();
  const isPasswordValid = formData.password.length >= 6;

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtpMessage({
        type: "secondary",
        text: "Email changed. Send a new OTP before registering.",
      });
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.role === "") {
      alert("Please select a role!");
      return false;
    }

    if (formData.role === "recipient") {
      alert("Recipient role is not allowed!");
      return false;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!normalizedEmail) {
      setOtpMessage({
        type: "danger",
        text: "Please enter your email first.",
      });
      return;
    }

    try {
      setIsSendingOtp(true);
      setOtpMessage({
        type: "secondary",
        text: "Sending OTP...",
      });

      await api.post("/auth/send-otp", { email: normalizedEmail });

      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpMessage({
        type: "success",
        text: `OTP sent to ${normalizedEmail}. Please check your email inbox.`,
      });
    } catch (err) {
      console.error("SEND OTP ERROR:", err.response?.data || err.message);
      setOtpSent(false);
      setOtpVerified(false);
      setOtpMessage({
        type: "danger",
        text: getRegisterErrorMessage(err) || "Could not send OTP email.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpSent) {
      setOtpMessage({
        type: "danger",
        text: "Please send OTP first.",
      });
      return;
    }

    if (!otp.trim()) {
      setOtpMessage({
        type: "danger",
        text: "Please enter the OTP from your email.",
      });
      return;
    }

    setIsVerifyingOtp(true);

    try {
      await api.post("/auth/verify-otp", {
        email: normalizedEmail,
        otp: otp.trim(),
      });

      setOtpVerified(true);
      setOtpMessage({
        type: "success",
        text: "OTP verified. You can now register.",
      });
    } catch (err) {
      console.error("VERIFY OTP ERROR:", err.response?.data || err.message);
      setOtpVerified(false);
      setOtpMessage({
        type: "danger",
        text: getRegisterErrorMessage(err) || "Invalid OTP. Please check your email and try again.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!otpVerified) {
      setOtpMessage({
        type: "danger",
        text: "Please send and verify OTP first.",
      });
      return;
    }

    const role = formData.role.trim().toLowerCase();
    const payload = {
      name: formData.name.trim(),
      fullName: formData.name.trim(),
      username: formData.name.trim(),
      email: normalizedEmail,
      password: formData.password,
      role,
      userRole: role,
      otp: otp.trim(),
    };

    try {
      setIsRegistering(true);
      console.log("REGISTER PAYLOAD:", payload);
      await api.post("/auth/register", payload);

      alert("Registration Successful!");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(getRegisterErrorMessage(err));
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #43cea2, #185a9d)",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "15px",
        width: "460px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
      }}>
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="mb-3">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder={otpSent ? "Enter OTP" : "Send OTP first"}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpVerified(false);
                }}
                disabled={!otpSent || otpVerified}
                required
              />
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleSendOtp}
                disabled={isSendingOtp || !normalizedEmail}
                style={{ minWidth: "105px" }}
              >
                {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp || !otpSent || otpVerified}
                style={{ minWidth: "105px" }}
              >
                {isVerifyingOtp ? "Checking..." : otpVerified ? "Verified" : "Verify OTP"}
              </button>
            </div>
            <div className={`form-text text-${otpMessage.type}`}>
              {otpMessage.text}
            </div>
          </div>

          <input
            type="password"
            className={`form-control ${isPasswordValid || !formData.password ? "" : "is-invalid"}`}
            placeholder="Password - minimum 6 characters"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />
          <div className={`form-text mb-3 ${isPasswordValid ? "text-success" : "text-muted"}`}>
            {isPasswordValid
              ? "Password length is valid."
              : `Password must be at least 6 characters. Current: ${formData.password.length}`}
          </div>

          <select
            className="form-control mb-3"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="logistics">Logistics</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={!otpVerified || !isPasswordValid || isRegistering}
          >
            {isRegistering
              ? "Registering..."
              : otpVerified
                ? isPasswordValid
                  ? "Register"
                  : "Enter 6+ Character Password"
                : "Verify OTP to Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
