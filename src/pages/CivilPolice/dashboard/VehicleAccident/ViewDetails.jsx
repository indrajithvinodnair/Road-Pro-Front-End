import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";

// import contents
import { ViewVehicleDetails } from "../../../../static/asset/Vechicle";
import {
  accidentVehicleDetails,
  accidentDetails,
} from "../../../../static/asset/Crime";

const ViewDetails = ({ type, fetchedData }) => {
  var TYPE_SPECIFIC_CARD;
  if (type === 1) {
    TYPE_SPECIFIC_CARD = (
      <Card border="danger" style={{ width: "18rem" }}>
        <Card.Header>
          <h5>Associated Vehicle</h5>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <ListGroup as="ul">
              {accidentVehicleDetails.map((vehicle) => {
                return (
                  <ListGroup.Item as="li" variant="info">
                    {vehicle.label + "  : "}
                    <b>{" " + fetchedData[vehicle.name]}</b>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  if (type === 2) {
    TYPE_SPECIFIC_CARD = (
      <Card border="danger" style={{ width: "18rem" }}>
        <Card.Header>
          <h5>Associated Person</h5>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <ListGroup as="ul">
              {accidentDetails.map((person) => {
                return (
                  <ListGroup.Item as="li" variant="info">
                    {person.label + "  : "}
                    <b>{" " + fetchedData[person.name]}</b>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <CardGroup>
        <Card border="danger" style={{ width: "18rem" }}>
          <Card.Header>
            <h5>Primary Information Report</h5>
          </Card.Header>
          <Card.Body>
            <Card.Text>
                {fetchedData.primaryInfo}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card border="danger" style={{ width: "18rem" }}>
          <Card.Header>
            <h5>Primary Vehicle</h5>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ListGroup as="ul">
                {ViewVehicleDetails.map((vehicle) => {
                  return (
                    <ListGroup.Item as="li" variant="info">
                      {vehicle.label + "  : "}
                      <b>{" " + fetchedData[vehicle.name]}</b>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
        {TYPE_SPECIFIC_CARD}
      </CardGroup>
    </>
  );
};

export default ViewDetails;
