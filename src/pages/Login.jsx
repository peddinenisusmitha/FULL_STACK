import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Captcha states
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;
    setNum1(number1);
    setNum2(number2);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (parseInt(captchaInput) !== num1 + num2) {
      alert("Captcha is incorrect!");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password.trim() === password.trim()
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      setEmail("");
      setPassword("");
      setCaptchaInput("");
      generateCaptcha();

      navigate(`/${foundUser.role}`);
      window.location.reload();
    } else {
      alert("Invalid Email or Password");
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
            autoComplete="off"
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
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