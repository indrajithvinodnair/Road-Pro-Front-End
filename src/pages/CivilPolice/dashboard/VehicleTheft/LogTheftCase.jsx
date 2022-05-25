import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
// loading
import Loading from "../../../../components/dashboard/Loading";
import {GetCurrentDate} from "../../../../components/functions/GetCurrentDate";
// alert
import swal from "sweetalert";
// import axios
import axios from "axios";

const LogTheftCase = ({ vehicleID, vehicleModel }) => {
  var history = useHistory();
  const [fetch, setFetch] = useState(false);
  const [officerName] = useState(localStorage.getItem("auth_name"));
  const [officerData, setOfficerData] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    setFetch(true);
  }, []);

  const getOfficerInfo = () => {
    axios.get(`/api/get-official-details/${officerName}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setOfficerData(res.data.officerId[0]);
          setLoading(false);
        } else if (res.data["status"] === 401) {
          history.push("/");
        }
      },
      (error) => {
        swal("error", "connection error", "error");
      }
    );
  };


  const logTheft = (vid, oid, date) => {
    let formData = new FormData();  
    formData.append("vid",vid);
    formData.append("oid",oid);
    formData.append("date",date);
    axios.post(`/api/log-new-theft`,formData).then(
        (res) => {
          if (res.data["status"] === 200) {
            swal("success", res.data["message"], "success");
          } else if (res.data["status"] === 401) {
            swal("warning", "Failed to Log Vehicle as stolen", "warning");
          }
        },
        (err) => {
          swal("error", "Connection error", "error");
        }
      );
  };

  if (fetch) {
    getOfficerInfo();
    setFetch(false);
  }

  if (isloading) {
    return <Loading />;
  } else {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Confirm Log</Card.Title>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Model</th>
                  <th>Officer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{GetCurrentDate()}</th>
                  <th>{vehicleModel}</th>
                  <th>{officerName}</th>
                </tr>
              </tbody>
            </table>
          <span className="card text-center">
              <Button
                variant="success"
                onClick={(e) => {
                  e.preventDefault();
                  logTheft(vehicleID,officerData.uId,GetCurrentDate());
                }}
              >
                Submit
              </Button>
            </span>
        </Card.Body>
      </Card>
    );
  }
};

export default LogTheftCase;
