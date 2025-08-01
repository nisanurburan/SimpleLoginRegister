import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Kullanıcı oturumunu sil (örneğin localStorage veya token temizlenebilir)
    localStorage.removeItem("token"); // Eğer token kaydedildiyse
    navigate("/login"); // Login sayfasına yönlendir
  };

  useEffect(() => {
    // Giriş yapılmadıysa yönlendir (basit örnek, auth kontrolü için)
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
