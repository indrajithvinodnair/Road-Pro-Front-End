import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";
import {
  accidentinfoDetails,
  theftInfoDetails,
} from "../../static/asset/Crime";
import Badge from "react-bootstrap/Badge";

import {
  Card,
  CardContent,
  H5,
  H6,
  ProgressLinear,
} from "ui-neumorphism";

const SearchEngine = () => {
  const [filtercriteria, setFilterCriteria] = useState("engine");
  const [errorMessage, setErrorMessage] = useState([]);
  const [searchitem, setSearchItem] = useState(null);
  const [isloading, setLoading] = useState(null); // global controller
  const [accidentInfo, setaccidentInfo] = useState([]);
  const [theftInfo, setTheftInfo] = useState([]);

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

  const fetchData = () => {
    axios
      .get(`/api/search-vehicle-case-based/${filtercriteria}/${searchitem}`)
      .then(
        (res) => {
          if (res.data["status"] === 200) {
            setaccidentInfo(res.data.accident);
            setTheftInfo(res.data.theft);
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

  // function to handle accident type
  const handleAccidentType = (id) => {
    if (id === 1) {
      return <Badge bg="primary">V - V</Badge>;
    } else if (id === 2) {
      return <Badge bg="warning">V - P</Badge>;
    }
  };

  // function to handle the crime record status
  const handleTheftStatus = (id) => {
    if (id === 1) {
      return <Badge bg="success">Closed</Badge>;
    } else if (id === 0) {
      return <Badge bg="info">Ongoing</Badge>;
    }
  };
  // function to handle type of vehicle
  const handleType = (id) => {
    if (id === 2) {
      return <span class="badge bg-danger">Non Reg</span>;
    } else if (id === 1) {
      return <span class="badge bg-success">Reg</span>;
    } else if (id === 3) {
      return <span class="badge bg-info">Official</span>;
    }
  };

  var ACCIDENT_INFO = "";
  var THEFT_INFO = "";
  if (accidentInfo.length > 0) {
    ACCIDENT_INFO = (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {accidentinfoDetails.map((c, i) => {
              return <th key={i}>{c.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {accidentInfo.map((row) => {
            return (
              <tr key={row.accidetId}>
                <td>{row.accidentId}</td>
                <td>{row.plateNumber}</td>
                <td>{row.date}</td>
                <td>{row.cause}</td>
                <td>{row.place}</td>
                <td>{row.primaryInfo}</td>
                <td>{handleAccidentType(row.accidentType)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    ACCIDENT_INFO = (
      <span className="text-danger fs-4 font-weight-bold">
        No Accident Data Found
      </span>
    );
  }

  if (theftInfo.length > 0) {
    THEFT_INFO = (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {theftInfoDetails.map((c, i) => {
              return <th key={i}>{c.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {theftInfo.map((row) => {
            return (
              <tr key={row.accidetId}>
                <td>{row.crimeId}</td>
                <td>{row.reportDate}</td>
                <td>{row.jurisdiction}</td>
                <td>{handleType(row.vehicleAccess)}</td>
                <td>{row.station}</td>
                <td>{handleTheftStatus(row.crimeStatus)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    THEFT_INFO = (
      <span className="text-danger fs-4 font-weight-bold">
        No Accident Data Found
      </span>
    );
  }

  return (
    <>
      <Card rounded width={500}>
        <H5 className="text-center text-secondary m-4">Search Vehicle</H5>

        <CardContent>
          <span className="text-secondary fs-5 m-3 shadow-lg ">Filter By</span>
          <select
            className="form-control-sm mx-3"
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
          <div className="row justify-content-center">
            <input
              rounded
              outlined
              className="form-control-lg mt-3"
              placeholder="Enter Search Number"
              id="search"
              onChange={(e) => {
                handleError(e.target.value);
                setSearchItem(e.target.value);
              }}
            />
            <p className="text-danger">{errorMessage}</p>
            <span className="text-center">
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
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setLoading("close");
                }}
              >
                Close
              </Button>
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        {isloading == "send" ? (
          <ProgressLinear indeterminate color="var(--primary)" />
        ) : (
          <span></span>
        )}
      </div>
      {isloading == "complete" ? (
        <>
          <span>
            <Card>
              <H6 className="text-center text-secondary m-4">
                Accident Information
              </H6>
              <CardContent>{ACCIDENT_INFO}</CardContent>
            </Card>
          </span>
          <span>
            <Card>
              <H6 className="text-center text-secondary m-4">
                Theft Information
              </H6>
              <CardContent>{THEFT_INFO}</CardContent>
            </Card>
          </span>
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default SearchEngine;
