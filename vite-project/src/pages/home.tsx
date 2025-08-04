import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    navigate("/login");
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowModal(true); // alert yerine modal aç
    }, 60 * 1000);
  };

  const confirmLogout = () => {
    setShowModal(false);
    handleLogout();
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!token || !expiresAt || new Date() > new Date(expiresAt)) {
      handleLogout();
    } else {
      resetTimer();
    }
  };

  useEffect(() => {
    checkAuth();

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome!</h1>
      <button style={styles.button} onClick={handleLogout}>
        Log out
      </button>

      {showModal && (
        <div style={styles.modal}>
          <p style={styles.modalText}>
            1 minute of inactivity. Session is being terminated.
          </p>
          <button style={styles.modalButton} onClick={confirmLogout}>
            OK
          </button>
        </div>
      )}
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
  modal: {
    position: "fixed" as const,
    top: "10%",               // Yukarıda görünmesi için
    left: "50%",
    transform: "translate(-50%, 0)", // Dikey ortalamayı kaldırdık
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  modalText: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  modalButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
