import "../styles/results.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Results() {
  const location = useLocation();
  const { source, destination } = location.state || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Dummy Data
  const data = {
    goa: {
      places: [
        {
          name: "Baga Beach",
          img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
        },
        {
          name: "Calangute Beach",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        },
        {
          name: "Fort Aguada",
          img: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e",
        },
      ],
      hotels: [
        {
          name: "Sea View Resort",
          img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        },
        {
          name: "Goa Paradise",
          img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        },
        {
          name: "Beach Stay",
          img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        },
      ],
      food: [
        {
          name: "Fisherman Dhaba",
          img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        },
        {
          name: "Spice Garden",
          img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        },
        {
          name: "Food Plaza",
          img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        },
      ],
    },

    delhi: {
      places: [
        {
          name: "India Gate",
          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
        },
        {
          name: "Red Fort",
          img: "https://images.unsplash.com/photo-1584367369853-1ec9c6c06a44",
        },
        {
          name: "Qutub Minar",
          img: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
        },
      ],
      hotels: [
        {
          name: "Delhi Palace",
          img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        },
        {
          name: "Royal Stay",
          img: "https://images.unsplash.com/photo-1568495248636-6432b97bd949",
        },
        {
          name: "Comfort Inn",
          img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        },
      ],
      food: [
        {
          name: "Chandni Chowk",
          img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
        },
        {
          name: "Karim's",
          img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        },
        {
          name: "Food Hub",
          img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        },
      ],
    },
  };

  const city = destination?.toLowerCase();
  const result = data[city];

  // 🔥 Loading UI
  if (loading) {
    return (
      <div className="results-container">
        <h2>Finding best options...</h2>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>
        Route: {source} → {destination}
      </h2>

      {result ? (
        <>
          {/* BOOKING */}
          <div className="booking">
            <h3>Book Your Travel</h3>

            <button onClick={() => window.open("https://www.irctc.co.in")}>
              Book Train
            </button>

            <button onClick={() => window.open("https://www.redbus.in")}>
              Book Bus
            </button>
          </div>

          {/* PLACES */}
          <div className="section">
            <h3>Places to Visit</h3>
            <div className="card-container">
              {result.places.map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HOTELS */}
          <div className="section">
            <h3>Hotels</h3>
            <div className="card-container">
              {result.hotels.map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FOOD */}
          <div className="section">
            <h3>Restaurants / Dhabas</h3>
            <div className="card-container">
              {result.food.map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="empty">
          <h3>No data found for this destination</h3>
          <p>Try Goa or Delhi</p>
        </div>
      )}
    </div>
  );
}

export default Results;