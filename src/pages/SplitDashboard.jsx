import { useNavigate } from "react-router-dom";
import "../styles/split.css";

function SplitDashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "/login";
  }

  const trips = JSON.parse(localStorage.getItem("trips")) || [];

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
        trips.map((trip, i) => {
          const total = trip.expenses.reduce(
            (sum, e) => sum + e.amount,
            0
          );

          return (
            <div className="trip-row" key={i}>
              <span className="trip-name">{trip.name}</span>
              <span className="trip-amount">₹{total}</span>

              <div className="trip-actions">
                <button onClick={() => navigate(`/split/${i}`)}>
                  View
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    const updated = trips.filter(
                      (_, index) => index !== i
                    );
                    localStorage.setItem(
                      "trips",
                      JSON.stringify(updated)
                    );
                    window.location.reload();
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