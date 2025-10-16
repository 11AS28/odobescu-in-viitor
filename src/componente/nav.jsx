import '../components_css/nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import pareri from './pareri.jsx'; 

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="/">Meniu</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/pareri">Parerile elevilor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/capsula-timpului">Capsula timpului</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Liceul de-a lungul timpului</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
