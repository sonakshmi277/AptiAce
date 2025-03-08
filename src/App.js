import FirstPg from './firstpg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin";
import Userpg from './userpg';
import ChapterPage from './ChapterPage';
export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<FirstPg />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/userpg" element={<Userpg/>}/>
          <Route path="/chapter/:chapterName" element={<ChapterPage />} />

          
        </Routes>
      </Router>
  );
}
