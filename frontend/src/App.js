import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PeopleList from "./components/list/PeopleList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
