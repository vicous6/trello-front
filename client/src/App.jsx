import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/LoginPage.jsx";
import MainPage from "../src/pages/MainPage.jsx";
import Board from "../src/pages/BoardPage.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
