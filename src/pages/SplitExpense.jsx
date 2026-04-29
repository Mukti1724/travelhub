import "../styles/split.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SplitExpense() {
  const { id } = useParams();

  const user = localStorage.getItem("user");
  if (!user) window.location.href = "/login";

  const [trip, setTrip] = useState(null);
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [desc, setDesc] = useState("");
  const [splitBetween, setSplitBetween] = useState([]);

  const [result, setResult] = useState([]);

  /* ================= FETCH TRIP ================= */
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/trip/single/${id}`);
        const data = await res.json();

        setTrip(data);
        setPeople(data.people || []);
        setExpenses(data.expenses || []);
        setSplitBetween(data.people || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrip();
  }, [id]);

  /* ================= UPDATE TRIP ================= */
  const updateTrip = async (updatedPeople, updatedExpenses) => {
    try {
      await fetch(`http://127.0.0.1:5000/trip/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          people: updatedPeople,
          expenses: updatedExpenses,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= SYNC CHECKBOX ================= */
  useEffect(() => {
    setSplitBetween(people);
  }, [people]);

  /* ================= ADD PERSON ================= */
  const addPerson = () => {
    if (name && !people.includes(name)) {
      const updated = [...people, name];
      setPeople(updated);
      updateTrip(updated, expenses);
      setName("");
    }
  };

  /* ================= DELETE PERSON ================= */
  const deletePerson = (person) => {
    const used = expenses.some(
      (e) => e.paidBy === person || e.splitBetween?.includes(person)
    );

    if (used) {
      alert("Cannot delete, person used in expenses");
      return;
    }

    const updated = people.filter((p) => p !== person);
    setPeople(updated);
    updateTrip(updated, expenses);
  };

  /* ================= TOGGLE ================= */
  const togglePerson = (p) => {
    setSplitBetween((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  /* ================= ADD EXPENSE ================= */
  const addExpense = () => {
    if (!amount || !paidBy || !desc) {
      alert("Fill all fields");
      return;
    }

    if (splitBetween.length === 0) {
      alert("Select at least one person");
      return;
    }

    const finalSplit = splitBetween.includes(paidBy)
      ? splitBetween
      : [...splitBetween, paidBy];

    const updated = [
      ...expenses,
      {
        amount: Number(amount),
        paidBy,
        desc,
        splitBetween: finalSplit,
      },
    ];

    setExpenses(updated);
    updateTrip(people, updated);

    setAmount("");
    setDesc("");
    setSplitBetween(people);
  };

  /* ================= DELETE EXPENSE ================= */
  const deleteExpense = (i) => {
    const updated = expenses.filter((_, idx) => idx !== i);
    setExpenses(updated);
    updateTrip(people, updated);
  };

  /* ================= CALCULATE ================= */
  const calculate = () => {
    const balances = {};
    people.forEach((p) => (balances[p] = 0));

    expenses.forEach((e) => {
      const share = e.amount / e.splitBetween.length;

      e.splitBetween.forEach((p) => {
        balances[p] -= share;
      });

      balances[e.paidBy] += e.amount;
    });

    const debtors = [];
    const creditors = [];

    Object.keys(balances).forEach((p) => {
      const bal = Math.round(balances[p] * 100) / 100;

      if (bal < 0) debtors.push({ name: p, amount: -bal });
      else if (bal > 0) creditors.push({ name: p, amount: bal });
    });

    const settlements = [];

    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];

      const amt = Math.min(d.amount, c.amount);

      settlements.push(`${d.name} pays ₹${amt} to ${c.name}`);

      d.amount -= amt;
      c.amount -= amt;

      if (d.amount === 0) i++;
      if (c.amount === 0) j++;
    }

    setResult(settlements);
  };

  /* ================= LOADING ================= */
  if (!trip) return <h2>Loading...</h2>;

  return (
    <div className="split-container">
      <h2 className="title">{trip.name}</h2>

      {/* PEOPLE */}
      <div className="split-card">
        <h3>Add People</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <button onClick={addPerson}>Add</button>

        <ul>
          {people.map((p, i) => (
            <li key={i} className="person-row">
              <span>{p}</span>
              <button
                className="delete-small"
                onClick={() => deletePerson(p)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* EXPENSE */}
      <div className="split-card">
        <h3>Add Expense</h3>

        <input
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
            <option key={i}>{p}</option>
          ))}
        </select>

        <h4>Split Between</h4>

        <div className="checkbox-group">
          {people.map((p, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={splitBetween.includes(p)}
                onChange={() => togglePerson(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* HISTORY */}
      <div className="split-card">
        <h3>History</h3>

        {expenses.map((e, i) => (
          <div key={i} className="expense-item">
            <p>
              <strong>{e.paidBy}</strong> paid ₹{e.amount} ({e.desc})
            </p>

            <button
              className="delete-small"
              onClick={() => deleteExpense(i)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button className="calc-btn" onClick={calculate}>
        Calculate
      </button>

      <div className="result">
        {result.map((r, i) => (
          <p key={i} className="settlement">
            {r}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SplitExpense;