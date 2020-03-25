import React from 'react';
import { Route, Link, BrowserRouter } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

function App() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (

    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
        </button>
            <Link to="/">amazona</Link>
            {/* <a href="index.html">amazona</a> */}
          </div>
          <div className="header-links">
            <Link to="/">Cart</Link>
            <Link to="/">Sign In</Link>
            {/* <a href="cart.html">Cart</a> */}
            {/* <a href="signin.html">Sign In</a> */}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>

            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/" exact={true} component={HomePage} />

          </div>

        </main>
        <footer className="footer">
          All right reserved.
    </footer>
      </div>
    </BrowserRouter >

  );
}

export default App;
