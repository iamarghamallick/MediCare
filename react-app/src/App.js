import { Routes, Route } from "react-router-dom";
import Predict from "./pages/Predict";
import Result from "./pages/Result";
import Home from "./pages/Home"; // if you have a homepage
import NearbyDoctors from "./pages/NearbyDoctors";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/result" element={<Result />} />
          <Route path="/nearby-doctors" element={<NearbyDoctors />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
