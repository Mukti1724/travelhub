import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Explore the World with TravelHub</h1>
        <p>Plan your trips easily and discover amazing places</p>

        <Link to="/plan" className="btn">
          Plan Your Trip
        </Link>
      </div>

      {/* IMAGE GALLERY */}
      <div className="gallery">
        <img src="https://www.southernliving.com/thmb/uC9lfdB-vpeXk1XuxT12bII4EQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1474089369-d2b0855436be4074ae986429058bf15c.jpg" />
        <img src="https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagtfHICCHhmg4xewO7PtRqpxY-GavY0egpQ&s" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb26Qyz_hObgRwlPZoj13o9HWeSE5PkFBqkw&s" />
      </div>

    </div>
  );
}

export default Home;