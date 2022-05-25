import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import custom component
import Addcase from './Addcase';

const ViewResult = ({ data }) => {

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => {
    setShowAdd(false);
  };
  const handleAddShow = () => setShowAdd(true);

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
            <th>Add case</th>
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
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddShow();
                }}
              >
                <i class="fas fa-plus"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal
        show={showAdd}
        animation="true"
        onHide={handleAddClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h3>Add New Traffic Case</h3>
        </Modal.Header>
        <Modal.Body>
         <Addcase vehicleID={data.vehicleID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewResult;
