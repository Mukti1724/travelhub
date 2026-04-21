import "../styles/results.css";
import { useLocation } from "react-router-dom";

function Results() {
  const location = useLocation();
  const { source, destination } = location.state || {};

  // Dummy Data with Images
  const data = {
    goa: {
      places: [
        { name: "Baga Beach", img: "https://source.unsplash.com/300x200/?beach" },
        { name: "Calangute Beach", img: "https://source.unsplash.com/300x200/?sea" },
        { name: "Fort Aguada", img: "https://source.unsplash.com/300x200/?fort" },
      ],
      hotels: [
        { name: "Sea View Resort", img: "https://source.unsplash.com/300x200/?hotel" },
        { name: "Goa Paradise", img: "https://source.unsplash.com/300x200/?resort" },
        { name: "Beach Stay", img: "https://source.unsplash.com/300x200/?villa" },
      ],
      food: [
        { name: "Fisherman Dhaba", img: "https://source.unsplash.com/300x200/?food" },
        { name: "Spice Garden", img: "https://source.unsplash.com/300x200/?restaurant" },
        { name: "Food Plaza", img: "https://source.unsplash.com/300x200/?dinner" },
      ],
    },

    delhi: {
      places: [
        { name: "India Gate", img: "https://source.unsplash.com/300x200/?india-gate" },
        { name: "Red Fort", img: "https://source.unsplash.com/300x200/?fort" },
        { name: "Qutub Minar", img: "https://source.unsplash.com/300x200/?qutub-minar" },
      ],
      hotels: [
        { name: "Delhi Palace", img: "https://source.unsplash.com/300x200/?hotel" },
        { name: "Royal Stay", img: "https://source.unsplash.com/300x200/?resort" },
        { name: "Comfort Inn", img: "https://source.unsplash.com/300x200/?room" },
      ],
      food: [
        { name: "Chandni Chowk", img: "https://source.unsplash.com/300x200/?street-food" },
        { name: "Karim's", img: "https://source.unsplash.com/300x200/?restaurant" },
        { name: "Food Hub", img: "https://source.unsplash.com/300x200/?food" },
      ],
    },
  };

  const city = destination?.toLowerCase();
  const result = data[city];

  return (
    <div className="results-container">
      <h2>
        Route: {source} → {destination}
      </h2>

      {result ? (
        <>
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
        </>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "30px" }}>
          No data available for this destination
        </h3>
      )}
    </div>
  );
}

export default Results;