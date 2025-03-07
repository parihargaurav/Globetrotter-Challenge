import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Invite from "./pages/Invite.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 text-gray-900">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="#/quiz" element={<Quiz />} />
            <Route path="#/invite" element={<Invite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
