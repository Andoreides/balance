import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import MainPage from "./components/MainPage/MainPage";
import Card from "./components/cards/Card";
import Basket from "./components/Basket/Basket";

function App() {
    return (
        <div className="App">
                <Routes>
                    <Route  path="/" element={<MainPage />}/>
                    <Route path="/:id" element={<Card />}  />
                    <Route path="/basket" element={<Basket />} />
                </Routes>
        </div>
    );
}

export default App;

