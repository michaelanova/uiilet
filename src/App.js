import "./styles/main.scss";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Head from "./components/Head.js";
import User from "./components/User.js";
function App() {
  return (
    <div className="App">
      <Head />
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="*" element={<head />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
