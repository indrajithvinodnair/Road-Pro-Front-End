import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../../../components/dashboard/Loading";

// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import custom components
import ViewDetails from "./ViewDetails";
import Gallery from "../../../dashboard/VehicleManagement/Gallery";

const ViewCases = ({ use }) => {
  const [caseData, setCaseData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(null);
  // modal for showing vehicle information
  const [showVehicleData, setShowVehicleData] = useState(false);

  const handleVehicleDataClose = () => {
    setShowVehicleData(false);
    getCaseInfo();
  };
  const handleVehicleDataShow = () => setShowVehicleData(true);
  // modal for showing owner information
  const [showOwnerData, setShowOwnerData] = useState(false);

  const handleOwnerDataClose = () => {
    setShowOwnerData(false);
    getCaseInfo();
  };
  const handleOwnerDataShow = () => setShowOwnerData(true);
  // modal for viewing image
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageModalClose = () => {
    setShowImageModal(false);
    getCaseInfo();
  };

  const handleImageModalShow = () => setShowImageModal(true);

  useEffect(() => {
    getCaseInfo();
  }, [use]);

  const getCaseInfo = () => {
    axios.get(`/api/get-case-all/${use}`).then(
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

  const handleType = (id) => {
    if (id === 2) {
      return <span className="badge bg-danger">Non Reg</span>;
    } else if (id === 1) {
      return <span className="badge bg-success">Reg</span>;
    } else if (id === 3) {
      return <span className="badge bg-info">Official</span>;
    }
  };

  const handleOwner = (item) => {
    const status = item.vehicleAccess;
    var link = "";
    if (status === 1) {
      const aadhar = item.aadharNo;
      link = `/api/get-reg-owner/${aadhar}`;
    } else if (status === 3) {
      const id = item.vehicleID;
      link = `/api/get-official-owner/${id}`;
    }
    axios.get(link).then(
      (res) => {
        if (res.data["status"] === 200) {
          setOwnerData(res.data.owner[0]);
          setSpinner("stopSpinning");
        } else if (res.data["status"] === 401) {
          swal("error", res.data["message"], "error");
        }
        getCaseInfo();
      },
      (err) => {
        swal("error", "Connection error", "error");
      }
    );
  };

  var btn_label = "";

  if (use === 1) {
    btn_label = "Renew Case";
  } else if (use === 0) {
    btn_label = "Close Case";
  }

  const handleStatus = (id) => {
    axios.get(`/api/update-case-status/${id}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          swal("Success", res.data["message"], "success");
        } else if (res.data["status"] === 401) {
          swal("error", res.data["message"], "error");
        }
        getCaseInfo();
      },
      (err) => {
        swal("error", "Connection error", "error");
      }
    );
  };

  if (isloading) {
    return <Loading />;
  } else {
    if (caseData.length > 0) {
      var TABLE_DATA = caseData.map((item) => {
        return (
          <tr key={item.crimeId}>
            <td>{item.crimeId}</td>
            <td>{item.jurisdiction}</td>
            <td>{item.station}</td>
            <td>{item.firstName + " " + item.lastName}</td>
            <td>{item.regDate}</td>
            <td>{item.updated_at.slice(11, 18)}</td>
            <td>{handleType(item.vehicleAccess)}</td>
            <td>
              <button
                className="btn btn-outline-primary bg-light text-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedData(item);
                  handleVehicleDataShow();
                }}
              >
                <i className="fa fa-car mx-2"></i>
                Details
              </button>
            </td>
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
                disabled={item.vehicleAccess === 2 ? true : false}
                onClick={(e) => {
                  e.preventDefault();
                  handleOwner(item);
                  setSpinner("startSpinning");
                  handleOwnerDataShow();
                }}
              >
                <i className="fa fa-user mx-2"></i>
                Details
              </button>
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  handleStatus(item.crimeId);
                }}
              >
                {btn_label}
              </button>
            </td>
          </tr>
        );
      });
      return (
        <>
          <table className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th>Crime ID</th>
                <th>Jurisdiction</th>
                <th>Station</th>
                <th>Logged By</th>
                <th>Log Date</th>
                <th>Log Time</th>
                <th>Vehicle Type</th>
                <th>Vehicle Details</th>
                <th>Gallery</th>
                <th>Ownership</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>{TABLE_DATA}</tbody>
          </table>
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
              <Modal.Title>Stolen {selectedData.modelName} Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ViewDetails fetchedData={selectedData} use="vehicle" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleVehicleDataClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showOwnerData}
            animation="true"
            dialogClassName="custom-modal-dialogue"
            onHide={handleOwnerDataClose}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>OwnerShip Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {spinner === "startSpinning"?(
                  <Loading />
              ):(
                  <ViewDetails fetchedData={ownerData} use="owner" />
                )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleOwnerDataClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showImageModal}
            animation="true"
            onHide={handleImageModalClose}
            backdrop="static"
            dialogClassName="custom-modal-dialogue-vehicle"
            size="lg"
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
        </>
      );
    } else {
      return (
        <span className="text-danger fs-4 font-weight-bold">
          {" "}
          No Case Available{" "}
        </span>
      );
    }
  }
};

export default ViewCases;
