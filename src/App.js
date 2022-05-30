import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "pages/Home/";


// STYLES
import 'styles/common.scss';


// https://reactrouter.com/docs/en/v6/getting-started/overview
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;