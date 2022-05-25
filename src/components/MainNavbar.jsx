import React from "react";
import {Link, useHistory} from 'react-router-dom';

//importing api handler
import axios from 'axios';
//importing alert system
import swal from 'sweetalert';


const MainNavbar = () => {
  
  var history = new useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then(
      (res) => {
        if (res.data["status"] === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          localStorage.removeItem("auth_role");
          swal("Success", res.data["message"], "success");
          history.push("/");
        } else {
          swal("Failure", res.data["message"], "error");
        }
      },
      function (error) {
        swal("Failure", "Connection Error", "error");
        return Promise.reject(error);
      }
    );
  };

  var isLoggedIn = localStorage.getItem("auth_token")?true:false;  
  var VisitorItem = "";
  if(!isLoggedIn){
    VisitorItem = (
      <>
      <li className="nav-item ">
      <Link to="/register" className="nav-link text-decoration-none">
        Register
      </Link>
    </li>
    <li className="nav-item ">
      <Link to="/login" className="nav-link text-decoration-none">
        Login
      </Link>
    </li>
    </>
    );
  }else{
    VisitorItem = (
      <>
      <li className="nav-item px-4">
      <Link to={"/"+localStorage.getItem('auth_role')} className="nav-link text-decoration-none">
        Profile
      </Link>
    </li>
    <li className="nav-item">
      <button className="btn btn-outline-danger my-2 my-sm-0 text-decoration-none" onClick={handleLogout}>
        logout
      </button>
    </li>
    </>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top ">
      <div className="container text-decoration-none">
        <Link to="/" className="navbar-brand text-decoration-none">
          Road Pro Systems
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navmenu">
          <ul className="navbar-nav ms-auto">
            {VisitorItem || window.location.reload() }
          </ul>
        </div>
      </div>
    </nav>
  );

}
export default MainNavbar;
