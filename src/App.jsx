import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layuot from "./components/Layuot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layuot />}></Route>
    </Routes>
  );
}

export default App;
