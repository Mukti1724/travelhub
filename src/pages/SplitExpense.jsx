import "../styles/split.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function SplitExpense() {
  const { id } = useParams();

  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "/login";
  }

  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  const trip = trips[id];

  const [people, setPeople] = useState(trip.people || []);
  const [expenses, setExpenses] = useState(trip.expenses || []);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [desc, setDesc] = useState("");

  const [result, setResult] = useState([]);

  const updateTrip = (updatedPeople, updatedExpenses) => {
    trips[id] = {
      ...trip,
      people: updatedPeople,
      expenses: updatedExpenses,
    };
    localStorage.setItem("trips", JSON.stringify(trips));
  };

  const addPerson = () => {
    if (name && !people.includes(name)) {
      const updated = [...people, name];
      setPeople(updated);
      updateTrip(updated, expenses);
      setName("");
    }
  };

  const addExpense = () => {
    if (amount && paidBy && desc) {
      const updated = [
        ...expenses,
        { amount: Number(amount), paidBy, desc },
      ];
      setExpenses(updated);
      updateTrip(people, updated);
      setAmount("");
      setDesc("");
    }
  };

  const calculate = () => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const share = total / people.length;

    const balances = {};
    people.forEach((p) => (balances[p] = 0));

    expenses.forEach((e) => {
      balances[e.paidBy] += e.amount;
    });

    const final = people.map((p) => ({
      name: p,
      balance: balances[p] - share,
    }));

    setResult(final);
  };

  return (
    <div className="split-container">
      <h2 className="title">{trip.name}</h2>

      {/* Add People */}
      <div className="split-card">
        <h3>Add People</h3>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addPerson}>Add</button>

        <ul>
          {people.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Add Expense */}
      <div className="split-card">
        <h3>Add Expense</h3>

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">Paid By</option>
          {people.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* History */}
      <div className="split-card">
        <h3>Expense History</h3>

        {expenses.length === 0 ? (
          <p>No history yet</p>
        ) : (
          expenses.map((e, i) => (
            <p key={i}>
              <strong>{e.paidBy}</strong> paid ₹{e.amount} for {e.desc}
            </p>
          ))
        )}
      </div>

      {/* Total */}
      <h3 className="total">
        Total: ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}
      </h3>

      <button className="calc-btn" onClick={calculate}>
        Calculate
      </button>

      {/* Result */}
      <div className="result">
        <h3>Balances</h3>

        {result.map((r, i) => (
          <p
            key={i}
            className={r.balance > 0 ? "positive" : "negative"}
          >
            {r.name}:{" "}
            {r.balance > 0
              ? `Gets ₹${r.balance}`
              : `Owes ₹${-r.balance}`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SplitExpense;