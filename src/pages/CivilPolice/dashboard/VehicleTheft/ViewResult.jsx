import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import theft log form
import LogTheftCase from "./LogTheftCase";
import axios from "axios";

const ViewResult = ({ data }) => {
  // modal for theft vehicle logging..
  const [showEdit, setShowEdit] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [fetch, setFetch] = useState(false);
  const handleEditClose = () => {
    checkLogged();
    setShowEdit(false);
  };
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setFetch(true);
  },[]);

  const checkLogged = () => {
    axios.get(`/api/check-logged/${data.vehicleID}`).then((res)=>{
      if (res.data["status"] === 200) {
        setLogged(true);
      } else if (res.data["status"] === 401) {
        setLogged(false);
      }
    })
  }

  if(fetch) {
    checkLogged();
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

  var btn_label = "";
  var btn_class = "";

  if(isLogged){
    btn_label = "Logged";
    btn_class = "btn btn-success text-light btn-sm"
  }else{
    btn_label = "Log Vehicle ";
    btn_class = "btn btn-warning text-dark btn-sm"
  }

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
            <th>Log Theft</th>
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
                className={btn_class}
                disabled={isLogged?(true):(false)}
                onClick={(e) => {
                  e.preventDefault();
                  handleEditShow();
                }}
              >
               {btn_label}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal
        show={showEdit}
        animation="true"
        onHide={handleEditClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Log a Theft Complaint for {data.modelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogTheftCase
            vehicleID={data.vehicleID}
            vehicleModel={data.modelName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewResult;
