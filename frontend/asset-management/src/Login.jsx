import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
  
    // Sample check — replace with your real logic
    if (username === "admin@example.com" && password === "admin123") {
      const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 mins
      localStorage.setItem("isAdminLoggedIn", "true"); // ✅ Set auth flag
      localStorage.setItem("expiresAt", expirationTime);
      navigate("/"); // ✅ Redirect to Dashboard ("/")
    } else {
      alert("Invalid email or password");
    }
  };

  // Check if admin is already logged in
  React.useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
      <div style={{ width: "300px", padding: "30px", background: "white", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Login</h2>
        {error && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button 
          onClick={handleLogin} 
          style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;