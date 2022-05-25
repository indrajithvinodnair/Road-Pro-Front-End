import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Card, Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";


import Loading from  "../../../components/dashboard/Loading" 
// import api handler
import axios from "axios";

import swal from "sweetalert";

//animations
import { fadeIn } from "react-animations";
import EditIcon from "@material-ui/icons/Edit";

// importtin custom components
import AddTrafficCrime from "./AddTrafficCrime";
import EditTrafficData from "./EditTrafficData";

const CardStyling = {
  width: "18rem",
  boxShadow:
    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  position: "unset",
};

const ButtonStyling = {
  float: "Right",
};

const FadeIn = keyframes`${fadeIn}`;

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  animation: 1s ${FadeIn};
`;
const DataTables = styled.div`
  padding-top: 50px;
`;
export default function Logcrime() {
  
  const [loading, setLoading] = useState(null);
  const [crimeData, setCrimeData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => {
    setShowEdit(false);
    setTableData();
  };
  const handleEditShow = () => setShowEdit(true);

  var TABLE_DATA = "";
  var TABLE_="";
  
  const[ logcase,setLogCase]=useState(false);

  if(logcase)
  {
      TABLE_ =(<AddTrafficCrime/>);
  }
  

  const setTableData = (id) => {
    axios.get(`/api/get-crime-data/${id}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setCrimeData(res.data.crimeData);
          setLoading("completed");
        }
      },
      (error) => {
        swal("error", "Connection error", "error");
      }
    );
  };

  var NODATA = "";

  if (loading === "clicked") {
    // return <Loading />;
    TABLE_DATA = <Loading />;
  } else if (loading === "completed") {
    if (crimeData.length !== 0) {
      TABLE_DATA = (
        <>
          <thead>
            <tr>
              <th>Id</th>
              <th>Aadhar Info</th>
              <th>Vehicle Id</th>
              <th>Date Issued</th>
              <th>Crime Status</th>
              <th>Issued By</th>
              <th>Jurisdiction</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {crimeData.map((row) => {
              return (
                <tr key={row.Id}>
                  <td>{row.Id}</td>
                  <td>{row.Aadhar}</td>
                  <td>{row.vehicle_id}</td>
                  <td>{row.date_issued}</td>
                  <td>{row.status}</td>
                  <td>{row.officer_id}</td>
                  <td>{row.jurisdiction}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedData(row);
                        handleEditShow();
                      }}
                    >
                      <EditIcon />{" "}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
      );
    } else {
      NODATA = (
        <span className="text-center text-danger">
          <h3>No Data available</h3>
        </span>
      );
    }
  }

  return (
    <div>
      <Featured>
        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/556848/screenshots/6661234/users_4x.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>View Logged active cases</Card.Title>
            <Card.Text> view all logged active cases in the database</Card.Text>

            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                setLoading("clicked");
                setTableData(-1);
                setLogCase(false);
              }}
            >
              View all
            </Button>
            <Button
              variant="secondary"
              style={{ float: "right" }}
              onClick={(e) => {
                e.preventDefault();
                setLoading("nValid");
              }}
            >
              {" "}
              Close{" "}
            </Button>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/1781121/screenshots/5924149/artboard_70_4x.png?compress=1&resize=1600x1200"
          />
          <Card.Body>
            <Card.Title>Log a new case</Card.Title>
            <Card.Text>Search for a vehicle and register a new case database </Card.Text>

            <Button variant="primary"
              onClick={(e) => {
                e.preventDefault();
                setLogCase(true);
                setLoading("invalid");
                
              }}>Log case</Button>
          </Card.Body>
        </Card>

        <Card style={CardStyling}>
          <Card.Img
            variant="top"
            src="https://cdn.dribbble.com/users/1743485/screenshots/4018711/media/ac695fb33f74813b6750786224dcf175.gif"
          />
          <Card.Body>
            <Card.Title>View all logged cases</Card.Title>
            <Card.Text>
              view logged cases that are both active and not currently active
            </Card.Text>
            <Link to="/admin/licencemanagement">
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setLoading("clicked");
                  setTableData(-2);
                  setLogCase(false);
                }}
              >
                View all
              </Button>
              <Button
                variant="secondary"
                style={{ float: "right" }}
                onClick={(e) => {
                  e.preventDefault();
                  setLoading("nValid");
                }}
              >
                {" "}
                Close{" "}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Featured>

      <DataTables>
        <Card>
          <Card.Title></Card.Title>
          <Card.Body>
            <Table>{TABLE_DATA}</Table>
            {NODATA}
          </Card.Body>
        </Card>
        {TABLE_}
      </DataTables>

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
          <Modal.Title>Update crime info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTrafficData crimeData={selectedData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      



    </div>
  );
}
