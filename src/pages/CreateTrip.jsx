import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/split.css";

function CreateTrip() {
  const [tripName, setTripName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!tripName) {
      alert("Enter trip name");
      return;
    }

    const trips = JSON.parse(localStorage.getItem("trips")) || [];

    trips.push({
      name: tripName,
      expenses: [],
    });

    localStorage.setItem("trips", JSON.stringify(trips));

    navigate("/split");
  };

  return (
    <div className="split-container">
      <div className="create-card">
        <h2>Create New Trip</h2>

        <input
          type="text"
          placeholder="Enter Trip Name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />

        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default CreateTrip;