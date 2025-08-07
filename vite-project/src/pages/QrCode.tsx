import { useEffect, useState } from "react";
import axios from "axios";

export default function QrCode() {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found, user is not logged in.");
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/Qr/generate`,
          0, // Numeric value of the QRCodeType enum (should match backend)
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setQrImage(response.data.qrCodeBase64); // Already a full data URI
      } catch (error) {
        console.error("Failed to fetch QR code:", error);
      }
    };

    fetchQrCode();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">QR Code:</h2>
      {qrImage ? (
        <img src={qrImage} alt="QR Code" style={{ width: 300, height: 300 }} />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
}
