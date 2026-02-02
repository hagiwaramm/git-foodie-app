import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import RestaurantCard from "./components/RestaurantCard";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "./components/Search";
import Visited from "./components/Visited";
import Saved from "./components/Saved";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <div className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/visited" element={<Visited />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
