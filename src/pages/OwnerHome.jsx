import "../styles/owner.css";
import { Link } from "react-router-dom";

function OwnerHome() {
  return (
    <div className="owner-home">
      <h1>Welcome Hotel Owners</h1>
      <p>Register your hotel and reach more travelers</p>

      <Link to="/owner/form" className="btn">
        Register Your Hotel
      </Link>
    </div>
  );
}

export default OwnerHome;