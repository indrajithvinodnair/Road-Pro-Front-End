import React, { useState, useEffect } from "react";
import {
  ViewVehicleDetails,
  OfficalOwnerDetails,
  RegisterdOwnerDetails,
} from "../../../../static/asset/Vechicle";
//import modal css
import "../../../../static/css/modal.css";

const ViewDetails = ({ fetchedData, use }) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (use === "vehicle") {
      setArray(ViewVehicleDetails);
    } else if (use === "owner") {
      if (fetchedData.hasOwnProperty("uId")) {
        setArray(RegisterdOwnerDetails);
      } else {
        setArray(OfficalOwnerDetails);
      }
    }
  }, [use]);

  return (
    <>
      <table className="table table-striped table-bordered ">
        <thead>
          <tr>
            {array.map((input, i) => {
              return <th key={i}>{input.label}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {array.map((input, i) => {
            return <th key={i}>{fetchedData[input.name]}</th>;
          })}
        </tbody>
      </table>
    </>
  );
};

export default ViewDetails;
