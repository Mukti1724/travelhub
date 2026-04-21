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
        <img src="https://source.unsplash.com/300x200/?beach" />
        <img src="https://source.unsplash.com/300x200/?mountains" />
        <img src="https://source.unsplash.com/300x200/?city" />
        <img src="https://source.unsplash.com/300x200/?travel" />
      </div>

    </div>
  );
}

export default Home;