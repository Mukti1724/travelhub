import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handlePlanClick = () => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
    else navigate("/plan");
  };

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <div className="overlay">
          <h1>Explore The World 🌍</h1>
          <p>Your journey starts here</p>

          <button className="hero-btn" onClick={handlePlanClick}>
            Let’s Travel ✈️
          </button>
        </div>
      </div>

      {/* POPULAR DESTINATIONS */}
      <div className="section">
        <h2>Popular Destinations</h2>

        <div className="cards">
  <div className="card">
    <img src="https://images.unsplash.com/photo-1587922546307-776227941871" />
    <p>Goa</p>
  </div>

  <div className="card">
    <img src="https://images.unsplash.com/photo-1580655653885-65763b2597d0" />
    <p>Manali</p>
  </div>

  <div className="card">
    <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944" />
    <p>Kerala</p>
  </div>

  <div className="card">
    <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" />
    <p>Paris</p>
  </div>
</div>
      </div>

      {/* WHY US */}
      <div className="section">
        <h2>Why Choose Us?</h2>

        <div className="features">
          <div>💸 Smart Expense Split</div>
          <div>🧭 Easy Trip Planning</div>
          <div>🏨 Verified Stays</div>
          <div>⚡ Fast & Simple</div>
          </div>
      </div>

    </div>
  );
}

export default Home;