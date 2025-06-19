import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Logging in with Username: ${username} and Password: ${password}`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
      <div style={{ width: "300px", padding: "30px", background: "white", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button onClick={handleLogin} style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "5px" }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
