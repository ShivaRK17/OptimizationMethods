import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/OptimizationMethods"}>Optimisation Algorithms</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/OptimizationMethods">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/OptimizationMethods/list"}>List of Algorithms</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/OptimizationMethods/graph"}>Graph</NavLink>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar