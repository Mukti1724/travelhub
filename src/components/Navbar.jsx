import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <h2>TravelHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/split">Split Expense</Link>
        <Link to="/owner">Hotel Owner</Link>
      </div>
    </nav>
  );
}

export default Navbar;