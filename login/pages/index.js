import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import "../styles/login.css";
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';


export default function Home({ providers }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <LoginForm />
        <div className="login-social">
          <h2 className="social-title">Or login with</h2>
          <div className="social-buttons">
            <button
              onClick={() => signIn("google")}
              className="btn-google"
            >
               <FaGoogle style={{ marginRight: '8px' }} />
               Google
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="btn-facebook"
            >
               <FaFacebook style={{ marginRight: '8px' }} />
              Facebook
            </button>
            <button
              onClick={() => signIn("linkedin")}
              className="btn-linkedin"
            >
               <FaLinkedin style={{ marginRight: '8px' }} />
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/saveCredentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Credentials stored successfully.");
    } else {
      alert(data.message || "Error saving credentials.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="login-form">
      <input
        type="text"
        className="input-field"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    <input
  type="password"
  className="input-field"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  minLength={8}
  maxLength={20}
  title="Password must contain at least one lowercase letter, one uppercase letter, one special character, and be between 8 and 20 characters long."
/>
      <button type="submit" className="btn-primary">
        Login
      </button>
    </form>
  );
}


export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
