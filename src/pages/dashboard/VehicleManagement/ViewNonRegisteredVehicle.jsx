import React, { useState, useEffect } from "react";
// api handler
import axios from "axios";
// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//import loading
import Loading from "../../../components/dashboard/Loading";

//import alert system
import swal from "sweetalert";
//import modal css
import "../../../static/css/modal.css";

//import form components
import RegisterVehicle from "./RegisterVehicle";
//import gallery component
import Gallery from "./Gallery";
// import edit component
import EditVehicle from "./EditVehicle";
// import owner display component
import ViewOwner from "./ViewOwner";


const ViewNonRegisteredVehicle = () => {
  // modal for adding vehicles
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterFormShow = () => setShowRegisterForm(true);

  const handleRegisterFormClose = () => {
    setShowRegisterForm(false);
    getVehicleData();
  };
  // modal for viewing image
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageModalClose = () => {
    setShowImageModal(false);
    getVehicleData();
  };

  const handleImageModalShow = () => setShowImageModal(true);

  // modal for viewing vehicle details
  const [showData, setShowData] = useState(false);
  const handleDataClose = () => {
    setShowData(false);
    getVehicleData();
  };
  const handleDataShow = () => setShowData(true);

  // modal for updating vechicle info
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => {
    setShowEdit(false);
    getVehicleData();
  };
  const handleEditShow = () => setShowEdit(true);

  // modal control for delete button confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClose = () => {
    setShowConfirm(false);
    getVehicleData();
  };
  const handleConfirmShow = () => setShowConfirm(true);

  // modal for viewing vehicle details
  const [showUserData, setShowUserData] = useState(false);
  const handleUserDataClose = () => {
    setShowUserData(false);
    getVehicleData();
  };
  const handleUserDataShow = () => setShowUserData(true);

  const [selectedData, setSelectedData] = useState({});
  const [isFetch, setIsFetch] = useState(false);
  const [isLoading, SetLoading] = useState(true);
  const [vechiclelist, setVehicleList] = useState([]);

  function getVehicleData() {
    axios.get(`/api/view-vehicle/2`).then((res) => {
      // console.log(res.data.civilanlist);
      if (res.status === 200) {
        //console.log(res.data.vehiclelist);
        setVehicleList(res.data.vehiclelist);
      }
      SetLoading(false);
    });
  }

  // function for deleting user
  const deleteVehicle = (id) => {
    axios.delete(`/api/delete-vehicle/${id}`).then(
      (res) => {
        if (res.data.status === 200) {
          swal("Success", res.data["message"], "success");
        } else if (res.data["status"] === 401) {
          swal("Warning", res.data["message"], "warning");
        }
        handleConfirmClose();
      },
      function (error) {
        swal("Error", "Connection Error", "error");
        handleConfirmClose();
      }
    );
  };

  useEffect(() => {
    setIsFetch(true);
  }, []);

  if (isFetch) {
    getVehicleData();
    setIsFetch(false);
  }

  var viewVehicleData_HTML_TABLE = "";
  var NoUserData = "";
  var btn_owner = "";
  if (isLoading) {
    return <Loading />;
  } else {
    //check if vehicle list is empty
    if (vechiclelist.length !== 0) {
      viewVehicleData_HTML_TABLE = vechiclelist.map((vehicle) => {
        var btnclass =
          vehicle.vechicleStatus === 0
            ? "btn btn-sm btn-outline-danger"
            : "btn btn-sm btn-outline-success";

        var btnlabel = vehicle.vechicleStatus === 0 ? "Verify" : "Verified";

        btn_owner =
          vehicle.aadharNo === "null" ? (
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-user"></i> Add Owner
            </button>
          ) : (
            <button className="btn btn-primary btn-sm"
            onClick={() => {
              setSelectedData(vehicle);
              handleUserDataShow();
            }}>
              <i className="fas fa-user"></i> Owner Details
            </button>
          );

        return (
          <tr key={vehicle.vehicleID}>
            <td>{vehicle.vehicleID}</td>
            <td>{vehicle.plateNumber}</td>
            <td>{vehicle.aadharNo}</td>
            <td>{vehicle.modelName}</td>
            <td>
              <button
                className={btnclass}
                onClick={(e) => {
                  e.preventDefault();
                  axios.get(`/api/verify-vehicle/${vehicle.vehicleID}`).then(
                    (res) => {
                      if (res.data["status"] === 200) {
                        swal("Verified", res.data["message"], "success");
                      } else if (res.data["status"] === 401) {
                        swal("Warning", res.data["message"], "warning");
                      }
                      getVehicleData();
                    },
                    function (error) {
                      swal("Error", "Connection Error", "error");
                    }
                  );
                }}
              >
                {btnlabel}
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedData(vehicle);
                  handleDataShow();
                }}
              >
                <i className="fas fa-car  px-1"></i>
                Details
              </button>
            </td>
            <td>{btn_owner}</td>
            <td>
              <button
                className="btn"
                onClick={() => {
                  setSelectedData(vehicle);
                  handleImageModalShow();
                }}
              >
                <i className="fas fa-images"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-success btn-sm"
                onClick={() => {
                  setSelectedData(vehicle);
                  handleEditShow();
                }}
              >
                Update Details
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setSelectedData(vehicle);
                  handleConfirmShow();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    } else {
      viewVehicleData_HTML_TABLE = <tr></tr>;
      NoUserData = (
        <h5 className="text-danger bg-light no-user-warning">
          No vehicles found{" "}
        </h5>
      );
    }
  }

  return (
    <>
      <div className="container px-2">
        <div className="card mt-4">
          <div className="card-header">
            <h4 className="card-title text-dark float-start">
              {" "}
              Road Pro System Users Vechicle{" "}
            </h4>
            <button
              className="btn btn-outline-success btn-sm float-end "
              onClick={handleRegisterFormShow}
            >
              Log a Vehicle
            </button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Plate Number</th>
                  <th>Registered Aadhar</th>
                  <th>Model Name</th>
                  <th>Status</th>
                  <th>Vehicle Details</th>
                  <th>Owner Details</th>
                  <th>Photos</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{viewVehicleData_HTML_TABLE}</tbody>
            </table>
            {NoUserData}
          </div>
        </div>
      </div>

      <Modal
        show={showRegisterForm}
        animation="true"
        onHide={handleRegisterFormClose}
        backdrop="static"
        dialogClassName="custom-modal-dialogue-vehicle"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterVehicle handler="admin" type={2} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleRegisterFormClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUserData}
        animation="true"
        onHide={handleUserDataClose}
        backdrop="static"
        size="lg"
        dialogClassName="custom-modal-dialogue"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedData["modelName"]} Ownership Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewOwner value={selectedData["aadharNo"]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleUserDataClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showData}
        animation="true"
        onHide={handleDataClose}
        backdrop="static"
        size="lg"
        dialogClassName="custom-modal-dialogue"
        aria-labelledby="data-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedData["modelName"] + " "}Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Engine Number</th>
                <th>Registration Data</th>
                <th>Manufactured Date</th>
                <th>Chasis Number</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Emission Category</th>
                <th>Seating Lt</th>
                <th>Standing Lt</th>
                <th>Cylinders</th>
                <th>Fuel</th>
                <th>Color</th>
                <th>Vechicle Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedData["engineNumber"]}</td>
                <td>{selectedData["regDate"]}</td>
                <td>{selectedData["manDate"]}</td>
                <td>{selectedData["chasisNumber"]}</td>
                <td>{selectedData["vechicleCategory"]}</td>
                <td>{selectedData["subCategory"]}</td>
                <td>{selectedData["emissionCategory"]}</td>
                <td>{selectedData["seatingCapacity"]}</td>
                <td>{selectedData["standingCapacity"]}</td>
                <td>{selectedData["cyclinderCount"]}</td>
                <td>{selectedData["fuelType"]}</td>
                <td>{selectedData["color"]}</td>
                <td>{selectedData["vehicleCost"]}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDataClose}>
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

      <Modal
        show={showEdit}
        animation="true"
        onHide={handleEditClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update {selectedData["modelName"]} Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditVehicle vehicleID={selectedData["vehicleID"]} type={1}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirm}
        animation="true"
        onHide={handleConfirmClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="text-center text-warning mt-5">
            Do You Want to permanently Delete {selectedData["modelName"] + " "}{" "}
            Vehicle
          </h4>
          <div className="m-4 d-flex justify-content-center">
            <Button
              variant="outline-success"
              className="mx-4 px-4"
              onClick={() => {
                deleteVehicle(selectedData["vehicleID"]);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outline-danger"
              className="px-4"
              onClick={handleConfirmClose}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewNonRegisteredVehicle;
