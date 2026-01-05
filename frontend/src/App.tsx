import React, { useState } from "react";
import { ethers } from "ethers";

const App: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Call the Go backend API
  const handleQuery = async () => {
    if (!address.startsWith("0x")) {
      alert("Please enter a valid Ethereum address (starts with 0x)");
      return;
    }

    setLoading(true);
    try {
      // Points to your Go backend service address
      const response = await fetch(`http://localhost:8080/api/balance/${address}`);
      const data = await response.json();

      if (data.result) {
        // Use ethers to convert units: Wei -> ETH
        const formattedBalance = ethers.formatEther(data.result);
        setBalance(formattedBalance);
      } else {
        alert("Query failed, please check if the address is correct");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Backend service not started or CORS issue exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center" }}
    >
      <h1>Web3 Portfolio Tracker</h1>
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Enter Ethereum address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "350px", padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleQuery}
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Querying..." : "Query Balance"}
        </button>
      </div>

      {balance && (
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          <strong>Current Balance:</strong> {balance} ETH
        </div>
      )}
    </div>
  );
};

export default App;
