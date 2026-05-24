import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Biography from "@/pages/Biography";
import Works from "@/pages/Works";
import Reader from "@/pages/Reader";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/works" element={<Works />} />
        <Route path="/reader/:chapterId" element={<Reader />} />
      </Routes>
    </Router>
  );
}
