import { useState } from "react";
import { useRouter } from "next/router";
// import { loginUser } from "../utils/api";
// import { setAuthToken, setUserData } from "../utils/auth";
import axios from "axios";
import styles from "../styles/auth.module.scss";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
    //  const response = await loginUser(formData);
    const response = await axios.post(
      "http://localhost:5000/api/login",
      { email: formData.email, password:formData.password },
      { withCredentials: true } 
  );
  console.log(response);
      // setAuthToken(response.data.token); // Save token in local storage
      // setUserData(response.data.user); // Save user data in local storage
      router.push(`/dashboard/${response.data.userDetails.role}`); // Redirect to role-based dashboard
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
