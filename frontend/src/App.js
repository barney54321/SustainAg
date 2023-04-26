import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Homepage";
import Education from "./Education";
import Community from "./Community";
import Account from "./Account";
import Post from "./Post";
import Marketplace from "./Marketplace";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/about" element={<About />} />
            <Route path="/community/:id" element={<Post />} />
            <Route path="/community" element={<Community />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Marketplace />} />
        </Routes>
    );
}

function About() {
    return <h2>About</h2>;
}
