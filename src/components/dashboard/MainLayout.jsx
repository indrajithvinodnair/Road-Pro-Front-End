import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import $ from "jquery";

//importing api handler
import axios from "axios";
//import alert mechanism
import swal from "sweetalert";

import { admin_routes } from "../../routes/routes";
import { user_routes } from "../../routes/routes";
import { traffic_routes } from "../../routes/routes";
import { rto_routes } from "../../routes/routes";
import { police_routes } from "../../routes/routes";

//import css
import "../../static/css/layout.css";
//logo
import logo from "../../static/img/logo.png";
import profile from "../../static/img/profile.png";

//importing custom components
import MainFooter from "../MainFooter";

// import user based side bar components
import AdminSide from "./sidebar/AdminSide";
import CivilianSide from "./sidebar/CivilianSide";
import TrafficSide from "./sidebar/TrafficSide";
import RTOSide from "./sidebar/RTOSide";
import CivilPoliceSide from "./sidebar/CivilPoliceSide";

const MainLayout = () => {
  const [userName] = useState(localStorage.getItem("auth_name"));
  const [userRole] = useState(localStorage.getItem("auth_role"));
  const [userContent, setUserContent] = useState([]);
  const [contentFlag, setContentFlag] = useState(false);
  const history = useHistory();

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
          swal("failed", res.data["message"], "error");
        }
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    setContentFlag(true);
  }, []);

  if (contentFlag) {
    if (userRole === "admin") {
      setUserContent(admin_routes);
    } else if (userRole === "user") {
      setUserContent(user_routes);
    } else if (userRole === "traffic") {
      setUserContent(traffic_routes);
    } else if (userRole === "rto") {
      setUserContent(rto_routes);
    } else if (userRole === "civil") {
      setUserContent(police_routes);
    }
    setContentFlag(false);
  }

  // user based content loading
  var HTML_HEADING = "";
  // user based page sidebar
  var HTML_PAGE_LAYOUT = "";
  if (userRole === "admin") {
    HTML_PAGE_LAYOUT = <AdminSide />;
    HTML_HEADING = <h2>RPS Admin</h2>;
  } else if (userRole === "user") {
    HTML_PAGE_LAYOUT = <CivilianSide />;
    HTML_HEADING = <h2>Road Pro System</h2>;
  } else if (userRole === "traffic") {
    HTML_PAGE_LAYOUT = <TrafficSide />;
    HTML_HEADING = <h2>RPS Traffic</h2>;
  } else if (userRole === "rto") {
    HTML_PAGE_LAYOUT = <RTOSide />;
    HTML_HEADING = <h2>RPS RTO</h2>;
  } else if (userRole === "civil") {
    HTML_PAGE_LAYOUT = <CivilPoliceSide />;
    HTML_HEADING = <h2>RPS CP</h2>;
  }

  return (
    <div className="body">
      <section id="menu">
        <div className="logo">
          <img src={logo} alt="noimg" />
          {HTML_HEADING}
        </div>
        <div className="items">
          <li>
            <Link id="a" to="/">
              <i className="fas fa-home"></i>
              Home
            </Link>
          </li>
          <li>
            <Link id="a" to={"/" + userRole + "/dashboard"}>
              <i className="fas fa-chart-pie"></i>
              DashBoard
            </Link>
          </li>
          {HTML_PAGE_LAYOUT}
        </div>
      </section>
      <section id="interface">
        <div className="navigation">
          <div className="n1">
            <div className="menu-btn">
              <button
                className="menubtn"
                onClick={() => {
                  $("#menu").toggleClass("active");
                }}
              >
                <i id="menu-btn" className="fas fa-bars"></i>
              </button>
            </div>
            <div className="search">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="search"></input>
            </div>
          </div>
          <div className="profile">
            <i className="far fa-bell"></i>
            <img src={profile} alt="noimg" />
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown px-4 ">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  to="drop-icon"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  <strong className="mx-1">{userName}</strong>
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end bg-light my-4 px-5"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleLogout}
                    >
                      logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="content">
          <Switch>
            {userContent.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    name={route.name}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => <route.component {...props} />}
                  />
                )
              );
            })}
            <Redirect
              from={"/" + userRole}
              to={"/" + userRole + "/dashboard"}
            />
          </Switch>
        </div>

        <MainFooter />
      </section>
    </div>
  );
};

export default MainLayout;
