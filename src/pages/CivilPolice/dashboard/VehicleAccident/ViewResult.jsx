import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
// meterial ui dialogue

import { List, DialogTitle, Dialog } from "@material-ui/core";

import axios from "axios";

// import custom components
import RegisterAccident from "./RegisterAccident";

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListClick = (value) => {
    onClose(value);
  };
  // return the specific dialogue
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Accident Type</DialogTitle>
      <List>
        <div className="text-center">
          <button
            className="btn btn-primary align-center"
            onClick={() => {
              handleListClick("1");
            }}
          >
            Vehicle To Vehicle
          </button>
        </div>
      </List>
      <List>
        <div className="text-center">
          <button
            className="btn btn-primary align-center my-2"
            onClick={() => {
              handleListClick("2");
            }}
          >
            Vehicle To Person
          </button>
        </div>
      </List>
    </Dialog>
  );
};

const ViewResult = ({ data }) => {
  // modal for theft vehicle logging..
  const [showEdit, setShowEdit] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [accidentType, setAccidentType] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = (value) => {
    // add function call to refresh the page
    setOpen(false);
    setAccidentType(value);
  };

  const handleEditClose = () => {
    checkLogged();
    setShowEdit(false);
  };
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setFetch(true);
  }, []);

  const checkLogged = () => {
    axios.get(`/api/check-logged/${data.vehicleID}`).then((res) => {
      if (res.data["status"] === 200) {
        setLogged(true);
      } else if (res.data["status"] === 401) {
        setLogged(false);
      }
    });
  };

  if (fetch) {
    //checkLogged();
    setFetch(false);
  }

  const handleType = (id) => {
    if (id === 2) {
      return <span class="badge bg-danger">Non Reg</span>;
    } else if (id === 1) {
      return <span class="badge bg-success">Reg</span>;
    } else if (id === 3) {
      return <span class="badge bg-info">Official</span>;
    }
  };

  return (
    <>
      <Table responsive="lg" hover>
        <thead>
          <tr>
            <th>Vehicle Type </th>
            <th>Plate Number</th>
            <th>Engine Number</th>
            <th>Aadhar Number</th>
            <th>Model Name</th>
            <th>Color</th>
            <th>Seating Capacity</th>
            <th>Reg Date</th>
            <th>Man Date</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Fuel Type</th>
            <th>Log Accident</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{handleType(data.vehicleAccess)}</td>
            <td>{data.plateNumber}</td>
            <td>{data.engineNumber}</td>
            <td>{data.aadharNo}</td>
            <td>{data.modelName}</td>
            <td>{data.color}</td>
            <td>{data.seatingCapacity}</td>
            <td>{data.regDate}</td>
            <td>{data.manDate}</td>
            <td>{data.vechicleCategory}</td>
            <td>{data.subCategory}</td>
            <td>{data.fuelType}</td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditShow();
                }}
              >
                Log Vehicle
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal
        show={showEdit}
        animation="true"
        onHide={() => {
          setAccidentType(null);
          handleEditClose();
        }}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Log a Accident Record for {data.modelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {accidentType === "1" || accidentType === "2" ? (
            <RegisterAccident type={accidentType} vehicleID={data.vehicleID} />
          ) : (
            <>
              <div className="text-center">
                <button
                  className="btn btn-secondary align-center"
                  onClick={handleClickOpen}
                >
                  Accident Type
                </button>
              </div>
              <SimpleDialog
                selectedValue={accidentType}
                open={open}
                onClose={handleClickClose}
              ></SimpleDialog>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewResult;
