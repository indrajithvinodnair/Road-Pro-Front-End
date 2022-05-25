import React, { useState, useEffect } from "react";
// api handler
import axios from "axios";
// loading
import Loading from "../../../components/dashboard/Loading";

import Table from "react-bootstrap/Table";

const ViewOwner = ({ value }) => {
  const [isFetch, setIsFetch] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [ownerData, setOwnerData] = useState([]);
  const [noData, setNoData] = useState(false);

  function getOwnerData() {
    axios.get(`api/get-owner/${value}`).then((res) => {
      if (res.data["status"] === 200) {
        setOwnerData(res.data.owner[0]);
        setNoData(false);
      } else if (res.data["status"] === 401) {
        setNoData(true);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    setIsFetch(true);
  }, []);

  if (isFetch) {
    getOwnerData();
    setIsFetch(false);
  }

  // function to handle licence status
  const handleStatus = (input) => {
    if (input === 0) {
      return <button className="btn btn-sucess  btn-sm ">Valid</button>;
    } else {
      return <button className="btn btn-danger  btn-sm">Suspended</button>;
    }
  };

  if (isloading) {
    return <Loading />;
  } else if (noData) {
    return (
      <div
        className="card text-white bg-danger  display-block mx-auto"
        style={{ "max-width": "18rem" }}
      >
        <div className="card-body">
          <h3 className="card-title">Missing Info</h3>
          <p className="card-text">
            Vehicle does not belong to a registered Owner
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Aadhar No</th>
            <th>Licence No</th>
            <th>Licence Status</th>
            <th>Dob</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>State</th>
            <th>Pin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ownerData.uId}</td>
            <td>{ownerData.firstName}</td>
            <td>{ownerData.lastName}</td>
            <td>{ownerData.aadharNo}</td>
            <td>{ownerData.licenceNo}</td>
            <td>{handleStatus(ownerData.licenceStatus)}</td>
            <td>{ownerData.dob}</td>
            <td>{ownerData.gender}</td>
            <td>{ownerData.phone}</td>
            <td>{ownerData.address}</td>
            <td>{ownerData.state}</td>
            <td>{ownerData.pinCode}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
};

export default ViewOwner;
