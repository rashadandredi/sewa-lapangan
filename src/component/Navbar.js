import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component{

    Logout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        localStorage.removeItem("id_user");
        localStorage.removeItem("id");
        window.location = "/login";
      }

      navGuest = () => {
        return(
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/clapangan" className="nav-item nav-link text-light mr-4">Sewa Lapangan</Link>
            </li>
            <li>
            <Link to="/login" className="nav-item nav-link text-light mr-4">Login</Link>
            </li>
          </ul>
          </div>
        )
      }

    navAdmin = () => {
      return(
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/lapangan" className="nav-item nav-link text-light mr-3">Data Lapangan</Link>
          </li>
          <li className="nav-item">
            <Link to="/member" className="nav-item nav-link text-light mr-3">Data Member</Link>
          </li>
          <li className="nav-item">
            <Link to="/profil" className="nav-item nav-link text-light mr-3">Profil</Link>
          </li>
          <li className="nav-item">
            <Link to="/sewa" className="nav-item nav-link text-light mr-3">Request Sewa</Link>
          </li>
          <li className="nav-item">
            <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
        </div>
      )
    }

    navUser = () => {
      return(
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/clapangan" className="nav-item nav-link text-light mr-3">Sewa Lapangan</Link>
          </li>
          <li className="nav-item">
            <Link to="/myprofil" className="nav-item nav-link text-light mr-3">Profil</Link>
          </li>
          <li className="nav-item">
            <a className="nav-item nav-link text-light mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
        </div>
      )
    }

    render(){
      let role= JSON.parse(localStorage.getItem('role'));
      let auth= localStorage.getItem('Token');
      console.log(role === "admin")
        return(
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand ml-5 text-white" href="#">Nyewo Lapangan</a>
            <button className="navbar-toggler btn-light" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            { !auth ? this.navGuest() : role ==="admin" ? this.navAdmin() : this.navUser() }
            </nav>
            </div>
        );
    }
}
export default Navbar;
