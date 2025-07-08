import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layuot from "./components/Layuot";
import Folder from "./features/folder/Folder";
import Home from "./components/Home";
import SinglePage from "./features/notes/SiglePage";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layuot />}>
        <Route index element={<Home />} />

        <Route path="folder">
          <Route index element={<Home />} />
          <Route path=":id" element={<Folder />} />
          <Route path="file/:id" element={<SinglePage />} />
        </Route>

        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
