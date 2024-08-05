import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Redirect from "./Pages/Redirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Redirect />} />
    </Routes>
  );
}

export default App;
