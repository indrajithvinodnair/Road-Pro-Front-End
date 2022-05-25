import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import api handler
import axios from "axios";

//animations
import { fadeIn } from "react-animations";

const CardStyling = {
  width: "18rem",
  boxShadow:
    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  position: "unset",
};

const FadeIn = keyframes`${fadeIn}`;

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  animation: 1s ${FadeIn};
`;

export default function Featuredinfo() {
  const [fetch, setFetch] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [licenseData, setLicenData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    setFetch(true);
  }, []);

  const getCount = () => {
    axios.get(`/api/get-user-count`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setTotalCount(res.data["totalcount"]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getLicenseStats = () => {
    axios.get(`/api/get-license-stats`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setLicenData(res.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getVehicleData = () => {
    axios.get(`/api/get-vehicle-data`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setVehicleData(res.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (fetch) {
    getCount();
    getLicenseStats();
    getVehicleData();
    setFetch(false);
  }

  return (
    <>
      <Featured>
        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/556848/screenshots/6661234/users_4x.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>Number of users</Card.Title>
            <Card.Text>There are {totalCount} users at present</Card.Text>
            <Link to="/admin/usermanagement">
              <Button variant="primary">view all users</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/1781121/screenshots/5924149/artboard_70_4x.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>Vehicles in the database</Card.Title>
            <Card.Text>
              There are {vehicleData["TotalVehicles"]} in the database
            </Card.Text>
            <Link to="/admin/vehiclemanagement">
              <Button variant="primary">View all</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/1743485/screenshots/4018711/media/ac695fb33f74813b6750786224dcf175.gif"
          />
          <Card.Body>
            <Card.Title>Licenses updated</Card.Title>
            <Card.Text>{licenseData["active"]} licenses</Card.Text>
            <Link to="/admin/licencemanagement">
              <Button variant="primary">View all</Button>
            </Link>
          </Card.Body>
        </Card>
      </Featured>
    </>
  );
}
