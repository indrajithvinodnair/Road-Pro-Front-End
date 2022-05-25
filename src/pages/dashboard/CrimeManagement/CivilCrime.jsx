import React, {useState } from "react";

import { Card, Button, Table } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeIn = keyframes`${fadeIn}`;

const Featured = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: center;
  animation: 1s ${FadeIn};
`;

const CardStyling = {
  width: "18rem",
  boxShadow:
    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  position: "unset",
};

const Wrapper = styled.div`
  padding: 20px;
`;

const CivilCrime = () => {
  const [isLoading, SetLoading] = useState(true);
  const [countFlag, setCountFlag] = useState(null);

  return (
    <>
      <Featured>
        <Wrapper>
          <Card style={CardStyling}>
            <Card.Img
              variant="top"
              src="https://cdn.dribbble.com/users/3809802/screenshots/7114331/media/9ec5cc3b78b7a60638ec7a7bd8d76aa5.png?compress=1&resize=1600x1200"
            />
            <Card.Body>
              <Card.Title>Log New Record</Card.Title>
              <Card.Text>00 cases are pending</Card.Text>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setCountFlag("stolen");
                  SetLoading(true);
                }}
              >
                Case Records
              </Button>
            </Card.Body>
          </Card>
        </Wrapper>
        <Wrapper>
          <Card style={CardStyling}>
            <Card.Img
              variant="top"
              src="https://cdn.dribbble.com/users/3809802/screenshots/7114331/media/9ec5cc3b78b7a60638ec7a7bd8d76aa5.png?compress=1&resize=1600x1200"
            />
            <Card.Body>
              <Card.Title>Log New Record</Card.Title>
              <Card.Text>00 cases are pending</Card.Text>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setCountFlag("stolen");
                  SetLoading(true);
                }}
              >
                Case Records
              </Button>
            </Card.Body>
          </Card>
        </Wrapper>
      </Featured>

      <div className="container mt-5">
        <div className="row mt-5">
          {countFlag === "stolen" ? (
            <>
              <Table responsive striped bordered hover>
                <thead>
                  <th>Case Id</th>
                  <th>Reg Date</th>
                  <th>Jurisdiction</th>
                  <th>Station</th>
                  <th>Reg. Officer </th>
                  <th>Type of vehicle</th>
                  <th>Engine No </th>
                  <th>Chassis No </th>
                  <th>Vehicle Details</th>
                  <th>Vehicle Owner</th>
                  <th>Case Details</th>
                  <th>Case Status</th>
                </thead>
              </Table>
              <div className="text-center mt-5">
                <button
                  className="btn btn-success p-2 mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCountFlag("nValid");
                  }}
                >
                  Close Info
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default CivilCrime;
