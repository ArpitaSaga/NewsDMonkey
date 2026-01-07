import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">NewsDMonkey</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/business" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Business</NavLink>
            {/* <Link className="nav-link" to="/business"></Link> */}
            </li>
            <li className="nav-item">
              <NavLink to="/entertainment" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Entertainment</NavLink>
            {/* <Link className="nav-link" to="/entertainment"></Link> */}
            </li>
            <li className="nav-item">
              <NavLink to="/health" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Health</NavLink>
            {/* <Link className="nav-link" to="/"></Link> */}
            </li>
            <li className="nav-item">
              <NavLink to="/science" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Science</NavLink>
            {/* <Link className="nav-link" to="/"></Link> */}
            </li>
            <li className="nav-item">
              <NavLink to="/sport" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sports</NavLink>
            {/* <Link className="nav-link" to="/sport"></Link> */}
            </li>
            <li className="nav-item">
              <NavLink to="/technology" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Technology</NavLink>
            {/* <Link className="nav-link" to="/"></Link> */}
            </li>
            
        </ul>
        {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
        </div>
    </div>
    </nav>
    </div>
    )
  }
}

export default Navbar
