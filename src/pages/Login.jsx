import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const getLoginErrorMessage = (err) => {
  const status = err.response?.status;
  const responseData = err.response?.data;

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
    return "Please enter a valid email and password.";
  }

  return "Invalid Email or Password";
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Captcha check
    if (parseInt(captchaInput) !== num1 + num2) {
      alert("Captcha is incorrect!");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    try {
      // ✅ API CALL
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      const normalizedRole = String(res.data.role || "").toLowerCase();

      // ✅ Store login data
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userRole", normalizedRole);

      // reset form
      setEmail("");
      setPassword("");
      setCaptchaInput("");
      generateCaptcha();

      // ✅ Navigate
      navigate(`/${normalizedRole}`);

      // 🔥 VERY IMPORTANT FIX
      window.location.reload(); // 👉 forces Navbar to update

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );

      generateCaptcha();
      setCaptchaInput("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "380px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mb-3">
            <label className="form-label fw-bold">
              Solve: {num1} + {num2} = ?
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter captcha answer"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
