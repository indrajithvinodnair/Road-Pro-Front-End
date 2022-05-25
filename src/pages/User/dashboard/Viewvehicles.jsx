import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";

// import api handler
import axios from "axios";
import { Table } from "react-bootstrap";
import swal from "sweetalert";
import Loading from "../../../components/dashboard/Loading";

// importing custom components
import EditVehicle from "./EditVehicle";
import RegisterVehicle from "../../dashboard/VehicleManagement/RegisterVehicle";

const CardStyling = {
  marginTop: "30px",
  position: "unset",
};

const ButtonStyling = {
  float: "Right",
};

export default function Viewvehicles() {
  const [fetch, setFetch] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [userName] = useState(localStorage.getItem("auth_name"));
  const [selectedData, setSelectedData] = useState([]);

  //modals for editing vehicle info
  const [showEditform, setShowEditForm] = useState(false);

  const handleEditFormShow = () => setShowEditForm(true);

  const handleEditFormClose = () => {
    setShowEditForm(false);
    getVehicleData();
  };

  //modal adding new vehicle
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFormShow = () => setShowAddForm(true);

  const handleAddFormClose = () => {
    setShowAddForm(false);
    getVehicleData();
  };

  const [vehicleData, setvehicleData] = useState([]);

  useEffect(() => {
    setFetch(true);
  }, []);

  const getVehicleData = () => {
    axios.get(`/api/get-vehicle-info/${userName}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setvehicleData(res.data.vehicleInfo);
          setLoading(false);
        } else if (res.data["status"] === 401) {
          swal("Error", res.data["message"], "error");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (fetch) {
    getVehicleData();
    setFetch(false);
  }

  var VEHICLE_DATA = "";
  if (isloading) {
    return <Loading />;
  } else {
    if (vehicleData.length !== 0) {
      VEHICLE_DATA = vehicleData.map((vehicle) => {
        return (
          <tr key={vehicle.vehicleID}>
            <td>{vehicle.engineNumber}</td>
            <td>{vehicle.modelName}</td>
            <td>{vehicle.regDate}</td>
            <td>{vehicle.plateNumber}</td>
            <td>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedData(vehicle);
                  handleEditFormShow();
                }}
              >
                <EditIcon />{" "}
              </Button>
            </td>
          </tr>
        );
      });
    } else {
      console.log("Error loading data");
    }
  }

  return (
    <div>
      <Card style={CardStyling}>
        <Card.Header>
          Owned vehicles
          <Button
            variant="primary"
            style={ButtonStyling}
            onClick={(e) => {
              e.preventDefault();
              handleAddFormShow();
            }}
          >
            Add vehicle
          </Button>
        </Card.Header>

        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
            <Table>
              <thead>
                <tr>
                  <th>Engine number</th>
                  <th>Model</th>
                  <th>Registered</th>
                  <th>Plate number</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{VEHICLE_DATA}</tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        show={showEditform}
        animation="true"
        onHide={handleEditFormClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h3>
            {" "}
            {"Edit " + localStorage.getItem("auth_name") + "'s Vehicle"}{" "}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <EditVehicle vehicleData={selectedData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditFormClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddForm}
        animation="true"
        onHide={handleAddFormClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h3> {"Add " + localStorage.getItem("auth_name") + "'s Vehicle"} </h3>
        </Modal.Header>
        <Modal.Body>
          <RegisterVehicle handler="user" type={1} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddFormClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
