import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      // ✅ DEBUG RESPONSE
      console.log("LOGIN RESPONSE:", data);

      if (res.ok && data.token) {
        // ✅ Save JWT Token
        localStorage.setItem("token", data.token);

        console.log(
          "Saved Token:",
          localStorage.getItem("token")
        );

        alert("Login successful");

        // ✅ Redirect to dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Login Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
