import React from "react";

function Home() {
  return (
    <div>

      {/* 🔵 Cover Section */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1593113598332-cd59a93b8f50')",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        {/* Text Content */}
        <div
          style={{
            position: "relative",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Welcome to ReliefConnect
          </h1>
          <p style={{ fontSize: "1.3rem" }}>
            Donate essentials during emergencies
          </p>
        </div>
      </div>

      {/* 🟣 Features Section */}
      <div
        style={{
          padding: "60px 20px",
          background: "linear-gradient(to right, #667eea, #764ba2)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>Our Features</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "20px",
              borderRadius: "15px",
              width: "250px",
            }}
          >
            <h4>📦 Easy Donation</h4>
            <p>Quickly donate food, clothes & essentials.</p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "20px",
              borderRadius: "15px",
              width: "250px",
            }}
          >
            <h4>📊 Track Status</h4>
            <p>Monitor your donation progress easily.</p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "20px",
              borderRadius: "15px",
              width: "250px",
            }}
          >
            <h4>🔒 Secure & Transparent</h4>
            <p>Admin ensures safe and fair operations.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;