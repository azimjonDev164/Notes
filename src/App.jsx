import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layuot from "./components/Layuot";
import Folder from "./features/folder/Folder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layuot />}>
        <Route index element={<Folder />} />
      </Route>
    </Routes>
  );
}

export default App;
