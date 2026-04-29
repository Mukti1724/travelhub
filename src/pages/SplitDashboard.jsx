import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/split.css";

function SplitDashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "/login";
  }

  const [trips, setTrips] = useState([]);

  // FETCH TRIPS FROM BACKEND
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`http://localhost:5000/trip/${user}`);
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrips();
  }, [user]);

  return (
    <div className="split-container">
      <h2>Split Expenses</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/split/new")}
      >
        + Create New Trip
      </button>

      {/* HEADER */}
      <div className="trip-header">
        <span>Trip Name</span>
        <span>Total</span>
        <span>Actions</span>
      </div>

      {/* TRIP LIST */}
      {trips.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No trips yet
        </p>
      ) : (
        trips.map((trip) => {
          const total = trip.expenses.reduce(
            (sum, e) => sum + e.amount,
            0
          );

          return (
            <div className="trip-row" key={trip._id}>
              <span className="trip-name">{trip.name}</span>
              <span className="trip-amount">₹{total}</span>

              <div className="trip-actions">
                {/* IMPORTANT CHANGE */}
                <button onClick={() => navigate(`/split/${trip._id}`)}>
                  View
                </button>

                {/* DELETE (we will backend later) */}
                <button
  className="delete-btn"
  onClick={async () => {
    const confirmDelete = window.confirm("Delete this trip?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://127.0.0.1:5000/trip/${trip._id}`, {
        method: "DELETE",
      });

      // remove from UI without reload
      setTrips((prev) => prev.filter((t) => t._id !== trip._id));

    } catch (err) {
      console.log(err);
    }
  }}
>
  Delete
</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SplitDashboard;