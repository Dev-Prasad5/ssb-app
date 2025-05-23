import React, { useState } from 'react';
import Navbar from './Navbar';
import PracticePage from './PracticePage';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // new component

function App() {
  const [navDisabled, setNavDisabled] = useState(false);

  return (
    <>
      <Navbar navDisabled={navDisabled} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticePage setNavDisabled={setNavDisabled} />} />
        <Route path="/tat" element={<div>TAT Test Coming Soon</div>} />
        <Route path="/wat" element={<div>WAT Test Coming Soon</div>} />
        <Route path="/srt" element={<div>SRT Test Coming Soon</div>} />
      </Routes>
    </>
  );
}

export default App;
