import React, { useState } from "react";

//axios
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../../components/dashboard/Loading";

import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

import ViewResult from "./ViewResult";

const AddTrafficCrime = () => {
  const [filtercriteria, setFilterCriteria] = useState("engine");
  const [searchitem, setSearchItem] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isloading, setLoading] = useState(null); // global controller'

  const CardStyling = {
    alignItems: "center",
  };

  const Nodata = styled.div`
    text-align: center;
    color: Red;
  `;

  const TableContent = styled.div`
    margin-top: 20px;
  `;

  const fetchData = () => {
    axios
      .get(`/api/search-vehicle-traffic/${filtercriteria}/${searchitem}`)
      .then(
        (res) => {
          if (res.data["status"] === 200) {
            setSearchResult(res.data.vehicle[0]);
            // console.log(res.data.vehicle[0]);
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
  var NODATA = "";

  if (isloading === "send") {
    SEARCH_HTML = <Loading />;
  } else if (isloading === "complete") {
    if (searchResult) {
      SEARCH_HTML = <ViewResult data={searchResult} />;
    } else {
      NODATA = <h3>No results found</h3>;
    }
  }

  return (
    <>
      <Card style={CardStyling}>
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
              }}
            >
              Close
            </Button>
          </span>
        </Card.Body>
      </Card>
      <TableContent>{SEARCH_HTML}</TableContent>
      <Nodata>{NODATA}</Nodata>
    </>
  );
};

export default AddTrafficCrime;
