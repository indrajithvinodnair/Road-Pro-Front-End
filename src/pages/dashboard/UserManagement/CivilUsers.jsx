import React, { useState, useEffect } from "react";
// api handler
import axios from "axios";
// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//import loading
import Loading from "../../../components/dashboard/Loading";

//import addciviluser form
import AddCivilUser from "./AddCivilUser";
//import editUser form
import EditUser from "./EditCivilanUser";

//import modal css
import "../../../static/css/modal.css";
import swal from "sweetalert";

const CivilUsers = () => {
  const [selectedData, setSelectedData] = useState({});
  const [isFetch, setIsFetch] = useState(false);
  // modal for adding user
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    getUserData();
  }
  const handleShow = () => setShow(true);
  // modal for viwing details
  const [showData, setShowData] = useState(false);
  const handleDataClose = () => {
    setShowData(false);
    getUserData();
  };
  const handleDataShow = () => setShowData(true);
  // modal for edit user
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => {
    setShowEdit(false);
    getUserData();
  };
  const handleEditShow = () => setShowEdit(true);

  // modal control for delete button confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClose = () => {
    setShowConfirm(false);
    getUserData();
  };
  const handleConfirmShow = () => setShowConfirm(true);

  const [isLoading, SetLoading] = useState(true);
  const [civilanlist, setCivilianList] = useState([]);

  function getUserData() {
    axios.get(`/api/view-civil-users`).then((res) => {
      // console.log(res.data.civilanlist);
      if (res.status === 200) {
        setCivilianList(res.data.civilanlist);
      }
      SetLoading(false);
    });
  }

  useEffect(() => {
    setIsFetch(true);
  }, []);

  if (isFetch) {
    getUserData();
    setIsFetch(false);
  }

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

  //formating
  var viewCivilanData_HTML_TABLE = "";
  var NoUserData = "";
  if (isLoading) {
    return <Loading />;
  } else {
   if(civilanlist.length !== 0){
    viewCivilanData_HTML_TABLE = civilanlist.map((user) => {
      var btnclass =
        user.userStatus === 0
          ? "btn btn-sm btn-outline-danger"
          : "btn btn-sm btn-outline-success";

      var btnlabel = user.userStatus === 0 ? "Verify" : "Verified";

      return (
        <tr key={user.uId}>
          <td>{user.uId}</td>
          <td>{user.userName}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>
            <button
              className={btnclass}
              onClick={(e) => {
                e.preventDefault();
                axios.get(`/api/verify-user/${user.uId}`).then(
                  (res) => {
                    if (res.data["status"] === 200) {
                      swal("Verified", res.data["message"], "success");
                    } else if (res.data["status"] === 401) {
                      swal("Warning", res.data["message"], "warning");
                    }
                    getUserData();
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
                setSelectedData(user);
                handleDataShow();
              }}
            >
              Details
            </button>
          </td>
          <td>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                setSelectedData(user);
                handleEditShow();
              }}
            >
              Update
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelectedData(user);
                handleConfirmShow();
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
   }else{
    viewCivilanData_HTML_TABLE = <tr></tr>;
    NoUserData = (
      <h5 className="text-danger bg-light no-user-warning">
        No Civilan User found{" "}
      </h5>
    );
   }
  }

  // function to handle licence status
  const handleStatus = (input) => {
    if (input === 0) {
      return <button className="btn btn-success  btn-sm ">Valid</button>;
    } else {
      return <button className="btn btn-danger  btn-sm">Suspended</button>;
    }
  };

  return (
    <>
      <div className="container px-2">
        <div className="card mt-4">
          <div className="card-header">
            <h4 className="card-title text-dark float-start">
              {" "}
              Road Pro System Civilian Users{" "}
            </h4>
            <button
              className="btn btn-outline-success btn-sm float-end"
              onClick={handleShow}
            >
              Add User
            </button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>User Email</th>
                  <th>User Status</th>
                  <th>Details</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{viewCivilanData_HTML_TABLE}</tbody>
            </table>
            {NoUserData}
          </div>
        </div>
      </div>
      <Modal
        animation = "true"
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Civil User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCivilUser />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showData}
        animation = "true"
        onHide={handleDataClose}
        backdrop="static"
        size="lg"
        dialogClassName="custom-modal-dialogue"
        aria-labelledby="data-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedData["userName"] + " "}Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>DOB[dd/mm/yyyy]</th>
                <th>Gender</th>
                <th>Aadhar Number</th>
                <th>Licence Number</th>
                <th>Licence Status</th>
                <th>Address</th>
                <th>State</th>
                <th>Pin</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedData["firstName"]}</td>
                <td>{selectedData["lastName"]}</td>
                <td>{selectedData["dob"]}</td>
                <td>{selectedData["gender"]}</td>
                <td>{selectedData["aadharNo"]}</td>
                <td>{selectedData["licenceNo"]}</td>
                <td>{handleStatus(selectedData["licenceStatus"])}</td>
                <td>{selectedData["address"]}</td>
                <td>{selectedData["state"]}</td>
                <td>{selectedData["pin"]}</td>
                <td>{selectedData["phone"]}</td>
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
        show={showEdit}
        animation = "true"
        onHide={handleEditClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update {selectedData["userName"]} Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser id={selectedData["uId"]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        animation = "true"
        show={showConfirm}
        onHide={handleConfirmClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="text-center text-warning mt-5">
            Do You Want to permanently Delete {selectedData["userName"] + " "}{" "}
            User
          </h4>
          <div className="m-4 d-flex justify-content-center">
            <Button
              variant="outline-success"
              className="mx-4 px-4"
              onClick={() => {
                deleteUser(selectedData["uId"]);
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

export default CivilUsers;

/* SbtnValue = (selectedData['licenceStatus'] === 0)?"Valid":"Suspended";
SbtnClass = (selectedData['licenceStatus'] === 0)?"btn btn-outline-success":"btn btn-outline-danger"; */
