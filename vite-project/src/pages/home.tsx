import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user session (e.g., clear localStorage or token)
    localStorage.removeItem("token"); // If token is stored
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // Redirect if not logged in (simple example for auth check)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome!</h1>
      <button style={styles.button} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "150px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
