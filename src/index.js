import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import App from "./App";
import BBB from "./bbb";
import About from "./About";
import Info from "./Info";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<><Navbar /><BBB /><App /><Footer /></>} />
                <Route exact path="/About" element={<><Navbar /><About /><Footer /></>} />
                <Route exact path="/Info" element={<><Navbar /><Info /><Footer /></>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
