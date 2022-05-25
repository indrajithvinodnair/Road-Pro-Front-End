import React, { useEffect, useState } from "react";
// modal
import Modal from "react-bootstrap/Modal";
// api handler
import axios from "axios";
// alert component
import swal from "sweetalert";
//import loading
import Loading from "../../../components/dashboard/Loading";
import { Card, Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeIn = keyframes`${fadeIn}`;

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  animation: 1s ${FadeIn};
`;

const CardStyling = {
  width: "18rem",
  boxShadow:
    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  position: "unset",
};

const LicenceManagement = () => {
  const [fetch, setFetch] = useState(false);
  const [countData, setCountData] = useState([]);
  const [countFlag, setCountFlag] = useState(null);
  const [isLoading, SetLoading] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  // state for storing licence data
  const [licenceData, setLicenceData] = useState([]);
  // modal control for delete button confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClose = () => {
    setShowConfirm(false);
    handleLicenceData(2);
    getCount();
  };
  const handleConfirmShow = () => setShowConfirm(true);
  useEffect(() => {
    setFetch(true);
  }, []);

  const getCount = () => {
    axios.get(`/api/get-lice-count`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setCountData(res.data);
        }
      },
      (error) => {
        swal("Error", error, "error");
      }
    );
  };

  const handleLicenceData = (id) => {
    axios.get(`/api/get-lice-info/${id}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setLicenceData(res.data.liceinfo);
        }
        SetLoading(false);
      },
      (error) => {
        swal("Error", error, "error");
      }
    );
  };

  // to update status
  const handleStatusUpdate = (id) => {
    axios.get(`/api/handle-licence-status/${id}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          swal("Success", res.data["message"], "success");
        } else if (res.data["status"] === 401) {
          swal("Warning", res.data["message"], "warning");
        }
      },
      (error) => {
        swal("Error", error, "error");
      }
    );
  };

  // to delete user
  const deleteUser = (id) => {
    axios.delete(`/api/delete-user/${id}`).then(
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

  if (fetch) {
    getCount();
    setFetch(false);
  }

  // function to handle licence status
  const handleStatus = (input) => {
    if (input === 0) {
      return <span className=" bg-success text-light btn-sm ">Valid</span>;
    } else {
      return <span className="bg-danger text-light btn-sm">Suspended</span>;
    }
  };

  // update vehicle status
  const handleUpdate = (input, id) => {
    if (input === 0) {
      return (
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            handleStatusUpdate(id);
            handleLicenceData(2);
            getCount();
          }}
        >
          Suspend
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-success btn-sm"
          onClick={(e) => {
            e.preventDefault();
            handleStatusUpdate(id);
            handleLicenceData(2);
            getCount();
          }}
        >
          Activate
        </button>
      );
    }
  };

  // setting up table html
  var InfoHTML_TABLE = "";
  var loadingHTML = "";
  if (isLoading) {
    loadingHTML = <Loading />;
  } else if (countFlag === "Valid" || countFlag === "Suspended") {
    InfoHTML_TABLE = licenceData.map((row) => {
      return (
        <tr>
          <td>{row.uId}</td>
          <td>{row.licenceNo}</td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.aadharNo}</td>
          <td>{row.dob}</td>
          <td>{row.phone}</td>
          <td>{row.state}</td>
          <td>{row.pinCode}</td>
        </tr>
      );
    });
  } else if (countFlag === "List") {
    InfoHTML_TABLE = licenceData.map((row) => {
      return (
        <tr>
          <td>{row.uId}</td>
          <td>{row.licenceNo}</td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.aadharNo}</td>
          <td>{handleStatus(row.licenceStatus)}</td>
          <td>{handleUpdate(row.licenceStatus, row.uId)}</td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={(e) => {
                e.preventDefault();
                setSelectedData(row);
                handleConfirmShow();
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <Featured>
        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/3809802/screenshots/7114331/media/9ec5cc3b78b7a60638ec7a7bd8d76aa5.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>Valid Licenses</Card.Title>
            <Card.Text>{countData.valid} licenses are valid</Card.Text>
            <Button
              variant="primary"
              disabled={countData.valid === 0 ? true : false}
              onClick={(e) => {
                e.preventDefault();
                SetLoading(true);
                handleLicenceData(0);
                countFlag === "Valid"?setCountFlag("invalid"):setCountFlag("Valid");
              }}
            >
              view all
            </Button>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/31664/screenshots/1697968/media/43b9bb557bbe26c688a8a592d6a12e61.gif"
          />
          <Card.Body>
            <Card.Title>Suspended Licenses</Card.Title>
            <Card.Text>
              Currently {countData.suspended} licenses are suspended
            </Card.Text>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                SetLoading(true);
                handleLicenceData(1);
                countFlag === "Suspended"?setCountFlag("invalid"):setCountFlag("Suspended");
              }}
              disabled={countData.suspended === 0 ? true : false}
            >
              view all
            </Button>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/3932073/screenshots/9829035/media/02bcf753f249110130bceef404433ff9.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>Manage Licenses</Card.Title>
            <Card.Text>
              Currently there are {countData.all} licenses in the database
            </Card.Text>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                SetLoading(true);
                handleLicenceData(2);
                countFlag === "List"?setCountFlag("invalid"):setCountFlag("List");
              }}
              disabled={countData.all === 0 ? true : false}
            >
              view all
            </Button>
          </Card.Body>
        </Card>
      </Featured>

      <div className="container mt-5">
        <div className="row-mt-5">
          {countFlag === "Valid" || countFlag === "Suspended" ? (
            <>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Licence Number</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Aadhar No</th>
                    <th scope="col">Dob</th>
                    <th scope="col">Phone</th>
                    <th scope="col">State</th>
                    <th scope="col">Pin</th>
                  </tr>
                </thead>
                <tbody>{InfoHTML_TABLE}</tbody>
              </table>
              {loadingHTML}
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
          {countFlag === "List" ? (
            <>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Licence Number</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Aadhar No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update Status</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{InfoHTML_TABLE}</tbody>
              </table>
              {loadingHTML}
              <div className="text-center mt-5">
                <button
                  className="btn btn-secondary p-2 mt-2"
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
      <Modal
        animation="true"
        show={showConfirm}
        onHide={handleConfirmClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="text-center text-danger mt-5">
            Deleting {selectedData["licenceNo"] + " "}will Delete
            {" " + selectedData["firstName"] + " "}
            User permanently.
          </h4>
          <div className="m-4 d-flex justify-content-center">
            <Button
              variant="outline-success"
              className="mx-4 px-4"
              onClick={() => {
                deleteUser(selectedData["uId"]);
              }}
            >
              Continue
            </Button>
            <Button
              variant="outline-primary"
              className="px-4"
              onClick={handleConfirmClose}
            >
              close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LicenceManagement;
