import React, { useState } from "react";
// react-bootstrap components
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Loading from "../../../../components/dashboard/Loading";


// api handlers
import axios from "axios";
import swal from "sweetalert";

// impor cutom components
import ViewResult from "./ViewResult";
import ViewCases from "./ViewCases";

const Wrapper = styled.div`
  background-color: #ffffff;
  margin-top: 80px;
  margin-left: 60px;
`;

const CardStyling = {
  width: "18rem",
  boxShadow:
    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  position: "unset",
};

const VehicleTheft = () => {
  const [menuflag, setMenuFlag] = useState(null); // global controller
  const [isloading, setLoading] = useState(null); // global controller
  const [viewflag, setViewFlag] = useState(null); // gloabl controller
  const [filtercriteria, setFilterCriteria] = useState("engine");
  const [searchitem, setSearchItem] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const fetchData = () => {
    axios.get(`/api/search-vehicle/${filtercriteria}/${searchitem}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setSearchResult(res.data.vehicle[0]);
          setLoading("complete");
        } else if (res.data["status"] === 401) {
          swal("error", res.data["message"], "error");
        }
      },
      (error) => {
        swal("error", "Connection Error", "error");
      }
    );
  };

  // manual validation codes

  const handleError = (value) => {
    if (filtercriteria === "engine") {
      value.length === 6
        ? setErrorMessage(null)
        : setErrorMessage("Invalid engine number");
    } else if (filtercriteria === "chassis") {
      value.length === 17
        ? setErrorMessage(null)
        : setErrorMessage("Invalid chassis number");
    } else if (filtercriteria === "aadhar") {
      value.length === 12
        ? setErrorMessage(null)
        : setErrorMessage("Invalid aadhar number");
    } else if (filtercriteria === "plate") {
      setErrorMessage(null);
    }
  };

  var SEARCH_HTML = "";
  var VIEW_HTML = "";

  if (isloading === "send") {
    SEARCH_HTML = <Loading />;
  } else if (isloading === "complete") {
    if (searchResult) {
      SEARCH_HTML = <ViewResult data={searchResult} />;
    } else {
      SEARCH_HTML = (
        <span className="text-danger fs-4 font-weight-bold">
          No Vehicle Data Found
        </span>
      );
    }
  }

  if (viewflag === "active") {
    VIEW_HTML = <ViewCases use={0} />;
  } else if (viewflag === "inactive") {
    VIEW_HTML = <ViewCases use={1} />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "justify-content": "left",
        }}
      >
        <Wrapper>
          <Card style={CardStyling}>
            <Card.Img
              variant="top"
              src="https://cdn.dribbble.com/users/3932073/screenshots/9829035/media/02bcf753f249110130bceef404433ff9.png?compress=1&resize=1600x1200"
            />
            <Card.Body>
              <Card.Title>Register Theft Case</Card.Title>
              <Card.Text>Search for the vehicle in RoadPro Database.</Card.Text>
              <Button
                size="lg"
                variant="dark"
                onClick={(e) => {
                  e.preventDefault();
                  menuflag === "nonOffical"
                    ? setMenuFlag("close")
                    : setMenuFlag("nonOffical");
                }}
              >
                Search and Register
              </Button>
            </Card.Body>
          </Card>
        </Wrapper>
        <Wrapper>
          <Card style={CardStyling}>
            <Card.Img
              variant="top"
              src="https://cdn.dribbble.com/users/3932073/screenshots/9829035/media/02bcf753f249110130bceef404433ff9.png?compress=1&resize=1600x1200"
            />
            <Card.Body>
              <Card.Title>Manage Theft Case</Card.Title>
              <Card.Text>
                Display Status of theft cases from Road Pro Database
              </Card.Text>
              <Button
                size="lg"
                variant="info"
                onClick={(e) => {
                  e.preventDefault();
                  setViewFlag("nValid");
                  setLoading("nValid");
                  menuflag === "manage"
                    ? setMenuFlag("close")
                    : setMenuFlag("manage");
                }}
              >
                View Cases
              </Button>
            </Card.Body>
          </Card>
        </Wrapper>
        {menuflag === "nonOffical" ? (
          <Wrapper>
            <Card>
              <Card.Body>
                <Card.Title>
                  <span className="text-secondary fs-5 m-3">Filter By</span>
                  <select
                    className="form-control-sm m-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setFilterCriteria(e.target.value);
                    }}
                  >
                    <option value="engine">Engine Number</option>
                    <option value="chassis">Chassis Number</option>
                    <option value="aadhar">Aadhar Number</option>
                    <option value="plate">Plate Number</option>
                  </select>
                </Card.Title>
                <Card.Text>
                  <input
                    type="text"
                    className="form-control-lg"
                    placeholder="Enter Search Number"
                    id="search"
                    onChange={(e) => {
                      handleError(e.target.value);
                      setSearchItem(e.target.value);
                    }}
                  />
                  <p className="text-danger">{errorMessage}</p>
                </Card.Text>
                <Button
                  variant="primary"
                  disabled={errorMessage ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoading("send");
                    fetchData();
                  }}
                >
                  Search
                </Button>
                <span className="p-2">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setLoading("close");
                      setMenuFlag("invalid");
                    }}
                  >
                    Close
                  </Button>
                </span>
              </Card.Body>
            </Card>
          </Wrapper>
        ) : (
          <div></div>
        )}

        {menuflag === "manage" ? (
          <>
            <Wrapper>
              <Card style={CardStyling}>
                <Card.Img
                  variant="top"
                  src="https://cdn.dribbble.com/users/3932073/screenshots/9829035/media/02bcf753f249110130bceef404433ff9.png?compress=1&resize=1600x1200"
                />
                <Card.Body>
                  <Card.Title>Active Cases</Card.Title>
                  <Card.Text>
                    Display Details of Active theft cases from Road Pro Database
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewFlag("active");
                    }}
                  >
                    View Cases
                  </Button>
                  <span className="p-2">
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setViewFlag("nValid");
                      }}
                    >
                      Close
                    </Button>
                  </span>
                </Card.Body>
              </Card>
            </Wrapper>
            <Wrapper>
              <Card style={CardStyling}>
                <Card.Img
                  variant="top"
                  src="https://cdn.dribbble.com/users/3932073/screenshots/9829035/media/02bcf753f249110130bceef404433ff9.png?compress=1&resize=1600x1200"
                />
                <Card.Body>
                  <Card.Title>Closed Theft Cases</Card.Title>
                  <Card.Text>
                    Display Details of Closed theft cases from Road Pro Database
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewFlag("inactive");
                    }}
                  >
                    View Cases
                  </Button>
                  <span className="p-2">
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setViewFlag("nValid");
                      }}
                    >
                      Close
                    </Button>
                  </span>
                </Card.Body>
              </Card>
            </Wrapper>
          </>
        ) : (
          <span></span>
        )}
      </div>
      <div className="text-center mt-5">
        {(viewflag === "active" || viewflag === "inactive") &&
        menuflag !== "nonOffical" ? (
          VIEW_HTML
        ) : (
          <span></span>
        )}
        {menuflag === "nonOffical" ? SEARCH_HTML : <span></span>}
      </div>
    </>
  );
};

export default VehicleTheft;
