import React, { useEffect, useState } from "react";

import { Card, Button, Table, Modal } from "react-bootstrap";
import Loading from "../../../components/dashboard/Loading";
// import api handler
import axios from "axios";

import swal from "sweetalert";



import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditcrimeInfo from "./EditcrimeInfo";
import AddcrimeInfo from "./AddcrimeInfo";

const CardStyling = {
  marginTop: "30px",
  position: "unset",
};

const ButtonStyling = {
  float: "Right",
};

export default function Managecrimes() {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [crimeData, setCrimeData] = useState([]);

  //modals for editing crime info
  const [showEditform, setShowEditForm] = useState(false);

  const handleEditFormShow = () => setShowEditForm(true);

  const handleEditFormClose = () => {
    setShowEditForm(false);
    getCrimeInfo(); // api call to view the crime data
  };

  const getCrimeInfo = () => {
    // api call to view all crime information
    axios.get(`/api/get-crime-info/-1`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setCrimeData(res.data.crimeinfo);
          setLoading(false);
        } else if (res.data["status"] === 401) {
          swal("Error", res.data["message"], "error");
        }
      },
      (error) => {
        
      }
    );
  };

  //modals for Adding crime info
  const [showAddform, setShowAddForm] = useState(false);

  const handleAddFormShow = () => setShowAddForm(true);

  const handleAddFormClose = () => {
    setShowAddForm(false);
    getCrimeInfo(); // api call to view the crime data
  };


  useEffect(() => {
    setFetch(true);
  }, []);

  if (fetch) {
    setLoading(true);
    getCrimeInfo();
    setFetch(false);
  }

  const handleDeleteInfarction = (id) =>{
    axios.delete(`/api/delete-infraction/${id}`).then(
      (res) => {
        if (res.data.status === 200) {
          swal("Success", res.data["message"], "success");

        } else if (res.data.status === 401) {
          swal("Warning", res.data["message"], "warning");
        }
        getCrimeInfo();
      },
      function (error) {
        swal("Error", "Connection Error"+{error}, "error");
      });
  }

  var CRIME_DATA = "";

  if (loading) {
    return <Loading />;
  } else {
    if (crimeData.length !== 0) {
      CRIME_DATA = crimeData.map((crime) => {
        return (
          <tr key={crime.infraction_id}>
            <td>{crime.infraction_id}</td>
            <td>{crime.infraction_name}</td>
            <td>{crime.punishment_type}</td>
            <td>{crime.punishment_amount}</td>
            <td>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedData(crime);
                  handleEditFormShow();
                }}
              >
                <EditIcon />{" "}
              </Button>
            </td>
            <td>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteInfarction(crime.infraction_id); // call to delete function
                }}
              >
                <DeleteIcon />{" "}
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
          Crimes and Penalities
          <Button variant="primary" style={ButtonStyling} onClick={handleAddFormShow}>
            Add crime
          </Button>
        </Card.Header>

        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <Table>
              <thead>
                <tr>
                  <th>Infraction Id</th>
                  <th>Infraction Name</th>
                  <th>Punishment Type</th>
                  <th>Punishment Amount</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{CRIME_DATA}</tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>

      {/*Modal to edit crime info*/}

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
          <h3>Edit crime information</h3>
        </Modal.Header>
        <Modal.Body>
          <EditcrimeInfo crimeData={selectedData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditFormClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal to add new crime info*/}

      <Modal
        show={showAddform}
        animation="true"
        onHide={handleAddFormClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h3>Add crime information</h3>
        </Modal.Header>
        <Modal.Body>
          <AddcrimeInfo  />
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
