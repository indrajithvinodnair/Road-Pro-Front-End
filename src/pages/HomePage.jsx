import React from "react";
import { Link } from "react-router-dom";

//importing custom components
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

//importing custom css
import "../static/css/pages.css";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <MainNavbar />
      <div className="content">
        <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
          <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between">
              <div>
                <h1>
                  Become <span className="text-warning"> RoadPro User </span>
                </h1>
                <p className="lead my-4">
                  We focus on integrating MVD , POLICE and each one of YOU into
                  a single portal system, integrating latest technologies and
                  services to make your life easier.
                </p>
              </div>
              <img
                className="img-fluid w-50 d-none d-sm-block"
                src="img/showcase.svg"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md">
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      <i className="bi bi-laptop"></i>
                    </div>
                    <h3 className="card-title mb-3">Virtual</h3>
                    <p className="card-text">
                      A virtual solution to all vehicle problem.
                    </p>
                    <Link to="/" className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="card bg-secondary text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      <i className="bi bi-person-square"></i>
                    </div>
                    <h3 className="card-title mb-3">Hybrid</h3>
                    <p className="card-text">
                      Hybrid architecture to integrate police and RTO
                      departments
                    </p>
                    <Link to="/" className="btn btn-dark">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      <i className="bi bi-people"></i>
                    </div>
                    <h3 className="card-title mb-3">Access</h3>
                    <p className="card-text">
                      Want to know your vehicle status at 24/7 , join us
                    </p>
                    <Link to="/" className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="learn">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md">
                <img src="img/fundamentals.svg" className="img-fluid" alt="" />
              </div>
              <div className="col-md p-5">
                <h2>How we came to be ?</h2>
                <p className="lead">
                  We stand against red tapism associated with governmental
                  services that deals with motor vehicles which involves
                  transferring ownership of a new vehicle, registering new
                  vehicles, applying, or upgrading existing permits or licenses,
                  handling legal procedures regarding vehicle related crimes
                  etc.
                </p>
                <p>
                  Expansion of the human population has forced us to find faster
                  means of travelling. We went from horse carts to bullet trains
                  in well over 400 years. The automobile reigns as the most
                  significant invention to date and is continuing its lead
                  today. Without automobiles, society would be remarkably less
                  developed, and the chores of daily life would be that much
                  more complicated. With the ever-expanding human population and
                  the resultant expansion in the number of automobiles,
                  stringent laws are put in place to maintain safe and open
                  public roads. These laws govern the process that starts with
                  the registration of an automobile to its decommission and
                  everything in between. However, following these laws require
                  labyrinthine paperwork and can prove to be a Herculean task
                  for both the governing body and the laymen. Road Pro system is
                  a centralized system which is accessible to both the governing
                  body and the common people. It aims at implementing a
                  paperless system which can be used to make the process of
                  abiding the governing laws unsophisticated. This means that
                  the interactions are more direct, up to date and transparent.
                  Road pro brings together three types of users from various
                  branches of the governing body, they are the traffic, civil,
                  the road transportation authority and the common people who
                  are the beneficiaries of their services.
                </p>
                <Link to="/" className="btn btn-light mt-3">
                  <i className="bi bi-chevron-right"></i> Read More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MainFooter />
    </div>
  );
};

export default HomePage;
