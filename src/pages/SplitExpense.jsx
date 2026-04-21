import "../styles/split.css";
import { useState } from "react";

function SplitExpense() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [desc, setDesc] = useState("");

  const [result, setResult] = useState([]);

  // Add person
  const addPerson = () => {
    if (name && !people.includes(name)) {
      setPeople([...people, name]);
      setName("");
    }
  };

  // Add expense
  const addExpense = () => {
    if (amount && paidBy && desc) {
      setExpenses([
        ...expenses,
        { amount: Number(amount), paidBy, desc },
      ]);
      setAmount("");
      setDesc("");
    }
  };

  // Calculate balances
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

      <h2>Split Expense Manager</h2>

      <div className="split-grid">

        {/* Add People */}
        <div className="box">
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
        <div className="box">
          <h3>Add Expense</h3>

          <input
            type="text"
            placeholder="Description (Food, Hotel...)"
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

        {/* Expense History */}
        <div className="box">
          <h3>Expense History</h3>
          {expenses.map((e, i) => (
            <p key={i}>
              {e.paidBy} paid ₹{e.amount} for {e.desc}
            </p>
          ))}
        </div>

      </div>

      {/* Calculate */}
      <button className="calc-btn" onClick={calculate}>
        Calculate
      </button>

      {/* Result */}
      <h3 className="total">
        Total Expense: ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}
        </h3>
      <div className="result">
        <h3>Balances</h3>
        {result.map((r, i) => (
  <p
    key={i}
    className={r.balance > 0 ? "positive" : "negative"}
  >
    {r.name}: {r.balance > 0
      ? `Gets ₹${r.balance}`
      : `Owes ₹${-r.balance}`}
  </p>
))}
      </div>

    </div>
  );
}

export default SplitExpense;