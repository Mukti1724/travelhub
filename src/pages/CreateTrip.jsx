import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/split.css";

function CreateTrip() {
  const [tripName, setTripName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // VERY IMPORTANT

    console.log("Form submitted");

    if (!tripName) {
      alert("Enter trip name");
      return;
    }

    const userId = localStorage.getItem("user");
    console.log("User:", userId);

    try {
      const res = await fetch("http://127.0.0.1:5000/trip", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId,
    name: tripName,
  }),
});

console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("Response:", data);

      alert(data.message);
      navigate("/split");

    } catch (err) {
      console.log("ERROR:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="split-container">
      <div className="create-card">
        <h2>Create New Trip</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="tripName"
            id="tripName"
            placeholder="Enter Trip Name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTrip;