import "../styles/owner.css";
import { useState } from "react";

function OwnerForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !location || !price || !contact) {
    setMsg("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location, price, contact }),
    });

    const data = await res.json();

    setMsg(data.message);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="owner-form">
      <div className="form-card">
        <h2>Register Hotel</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hotel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price per night"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}

export default OwnerForm;