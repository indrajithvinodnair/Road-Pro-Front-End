import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../../../components/dashboard/Loading";

// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import custom components
import Gallery from "./Gallery";
import ViewDetails from './ViewDetails';

const ViewAccidents = ({ type }) => {
  const [isloading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  // modal for viewing image
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageModalClose = () => {
    setShowImageModal(false);
    getCaseInfo();
  };
  // modal for showing vehicle information
  const [showVehicleData, setShowVehicleData] = useState(false);

  const handleVehicleDataClose = () => {
    setShowVehicleData(false);
    getCaseInfo();
  };
  const handleVehicleDataShow = () => setShowVehicleData(true);

  const handleImageModalShow = () => setShowImageModal(true);

  const getCaseInfo = () => {
    axios.get(`/api/get-accident-all/${type}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setCaseData(res.data.caselist);
          setLoading(false);
        }
      },
      (error) => {
        swal("error", "Connection error", "error");
      }
    );
  };

  useEffect(() => {
    getCaseInfo();
  }, [type]);

  var CASE_DATA = "";

  if (isloading) {
    return <Loading />;
  } else {
    CASE_DATA = caseData.map((item) => {
      return (
        <tr>
          <td>{item.accidentId}</td>
          <td>{item.jurisdiction}</td>
          <td>{item.station}</td>
          <td>{item.firstName + " " + item.lastName}</td>
          <td>{item.date}</td>
          <td>{item.cause}</td>
          <td>{item.place}</td>
          <td>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedData(item);
                handleImageModalShow();
              }}
            >
              <i className="fa fa-images mx-2"></i>
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-primary bg-light text-dark"
              onClick={(e) => {
                e.preventDefault();
                setSelectedData(item);
                handleVehicleDataShow();
              }}
            >
              <i className="fa fa-car-crash mx-2"></i>
              Details
            </button>
          </td>
          <td>{item.created_at.slice(0, 10)}</td>
          <td>{item.created_at.slice(11, 18)}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <table className="table table-striped table-bordered ">
        <thead>
          <tr>
            <th>Accident ID</th>
            <th>Jurisdiction</th>
            <th>Station</th>
            <th>Logged By</th>
            <th>Incident Date</th>
            <th>Cause</th>
            <th>Place</th>
            <th>Gallery</th>
            <th>Details</th>
            <th>Log Date</th>
            <th>Log Time</th>
          </tr>
        </thead>
        <tbody>{CASE_DATA}</tbody>
      </table>
      <Modal
        show={showImageModal}
        animation="true"
        onHide={handleImageModalClose}
        backdrop="static"
        dialogClassName="custom-modal-dialogue-vehicle"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Gallery data={selectedData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleImageModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showVehicleData}
        animation="true"
        dialogClassName="custom-modal-dialogue"
        onHide={handleVehicleDataClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Accident {selectedData.accidentId} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewDetails fetchedData={selectedData} type={type} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleVehicleDataClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewAccidents;
