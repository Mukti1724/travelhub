import "../styles/plan.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Plan() {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "/login";
  }

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!source || !destination) {
      alert("Please fill all fields");
      return;
    }

    navigate("/results", {
      state: { source, destination },
    });
  };

  return (
    <div className="plan-container">
      <div className="plan-card">
        <h2>Plan Your Trip</h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Plan;