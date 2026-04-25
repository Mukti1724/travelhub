import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Plan from "./pages/Plan";
import Results from "./pages/Results";
import SplitExpense from "./pages/SplitExpense";
import OwnerHome from "./pages/OwnerHome";
import OwnerForm from "./pages/OwnerForm";
import SplitDashboard from "./pages/SplitDashboard";
import CreateTrip from "./pages/CreateTrip";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Traveler Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/results" element={<Results />} />
        <Route path="/split" element={<SplitDashboard />} />
        <Route path="/split/new" element={<CreateTrip />} />
        <Route path="/split/:id" element={<SplitExpense />} />
        

        {/* Hotel Owner Routes */}
        <Route path="/owner" element={<OwnerHome />} />
        <Route path="/owner/form" element={<OwnerForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;