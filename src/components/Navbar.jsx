import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav>
      <h2>TravelHub</h2>

      <div>
        <Link to="/">Home</Link>

        {/* Plan & Split always visible */}
        <span onClick={() => handleProtectedRoute("/plan")}>Plan</span>
        <span onClick={() => handleProtectedRoute("/split")}>
          Split Expense
        </span>

        {!user ? (
          <>
            <Link to="/owner">List Your Hotel</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;