import React from "react";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-bg h-[100vh]">
      <header className="App-header w-[100wv] h-[35px] bg-primary text-white"></header>
      {/* <ApiLogin /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/createctrl" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
