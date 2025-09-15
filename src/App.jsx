import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Videos from "./pages/Videos/Videos";
import Home  from "./pages/Home/Home";
import { useState } from "react";


const App = () => {

  const [sidebar , setSidebar] = useState(true);
  return (
    <div>

      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} /> }/>
        <Route path="/video/:categoryId/:videoId" element={<Videos/>}/>

      </Routes>
    </div>
  );
};

export default App;
