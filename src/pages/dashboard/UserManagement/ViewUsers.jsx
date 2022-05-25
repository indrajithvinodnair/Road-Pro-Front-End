import React, { useState, useEffect } from "react";
// api handler
import axios from "axios";
// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//import alert system
import swal from "sweetalert";

//import loading
import Loading from "../../../components/dashboard/Loading";
//importing modal form
import AddUser from "./AddUser";
//importing edit user form
import EditUser from "./EditUser";

const ViewUser = ({ role, value }) => {
  // for storing selected user data
  const [selectedData, setSelectedData] = useState({});
  const [isFetch, setIsFetch] = useState(false);

  const [isloading, setLoading] = useState(true);

  const [userlist, setUserList] = useState([]);

  // modal for adding user
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    getUserData();
  };
  const handleShow = () => setShow(true);
  // modal for editiing user
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

  useEffect(() => {
    setIsFetch(true);
  }, []);

  function getUserData() {
    axios.get(`api/view-users/${value}`).then((res) => {
      if (res.status === 200) {
        setUserList(res.data.userslist);
      }
      setLoading(false);
    });
  }

  // function for deleting user
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

  if (isFetch) {
    getUserData();
    setIsFetch(false);
  }

  //formating
  var viewUserData_HTML_TABLE = "";
  var viewUserTable_Structure = "";

  var NoUserData = "";
  
  if (isloading) {
    return <Loading />;
  } else {
    if (userlist) {
      if (value === 0) {
        viewUserTable_Structure = (
          <tr>
            <th>{role + " ID"}</th>
            <th>{role + " Name"}</th>
            <th>{role + " Email"}</th>
            <th>Delete</th>
          </tr>
        );
        viewUserData_HTML_TABLE = userlist.map((user) => {
          return (
            <tr key={user.uId}>
              <td>{user.uId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          );
        });
      } else if (value !== 0 && value !== 4) {
        viewUserTable_Structure = (
          <tr>
            <th>{role + " ID"}</th>
            <th>{role + " Name"}</th>
            <th>{role + " Email"}</th>
            <th>{role + " Jursidiction"}</th>
            <th>{role + " Station"}</th>
            <th>{role + " Phone"}</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        );
        viewUserData_HTML_TABLE = userlist.map((user) => {
          return (
            <tr key={user.uId}>
              <td>{user.uId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.jurisdiction}</td>
              <td>{user.station}</td>
              <td>{user.phone}</td>
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
      }
    } else {
      viewUserData_HTML_TABLE = <tr></tr>;
      NoUserData = (
        <h5 className="text-danger bg-light no-user-warning">
          No users found{" "}
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
              Road Pro System {role} Users{" "}
            </h4>
            <button
              className="btn btn-outline-success btn-sm float-end "
              onClick={handleShow}
            >
              Add User
            </button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>{viewUserTable_Structure}</thead>
              <tbody>{viewUserData_HTML_TABLE}</tbody>
            </table>
            {NoUserData}
          </div>
        </div>
      </div>
      <Modal
        show={show}
        animation = "true"
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {role} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser role={role} value={value} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
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

      <Modal
        animation = "true"
        show={showEdit}
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
    </>
  );
};

export default ViewUser;
