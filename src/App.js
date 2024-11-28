import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BullyingPage from "./pages/BullyingPage";
import DamagePage from "./pages/DamagePage";
import FoodPage from "./pages/FoodPage";
import HomePage from "./pages/HomePage";
import ParkingPage from "./pages/ParkingPage";
import TheftPage from "./pages/TheftPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theft" element={<TheftPage />} />
        <Route path="/bullying" element={<BullyingPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/damage" element={<DamagePage />} />
        <Route path="/food" element={<FoodPage />} />
      </Routes>
    </Router>
  );
};

export default App;
