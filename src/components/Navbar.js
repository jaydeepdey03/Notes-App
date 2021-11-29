import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';


export const Navbar = (props) => {
    const { showAlert } = props
    const history = useHistory()
    let location = useLocation();

    const logout = () => {
        showAlert('Successfully Logged out', 'success')
        localStorage.removeItem('auth-token')
        history.push('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('auth-token') ? <form className="d-flex">
                            <Link to="/login" className="btn btn-primary mx-3">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </form> : <Link onClick={logout} to="/login" className="btn btn-primary mx-3">Logout</Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}
