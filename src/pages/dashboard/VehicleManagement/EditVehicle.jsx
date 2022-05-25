import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// importing for redirection
import { useHistory } from "react-router-dom";

//axios
import axios from "axios";
import swal from "sweetalert";

//import form contents
import { VechicleRegistrationContent } from "../../../static/asset/Vechicle";
//import loading
import Loading from "../../../components/dashboard/Loading";

const schema = yup
  .object()
  .shape({
    plateNumber: yup.string().required(),
    engineNumber: yup
      .string()
      .required()
      .min(6, "Enter a valid engine numebr")
      .max(6, "Enter a valid engine number"),
    regDate: yup.string().required(),
    manDate: yup.string().required(),
    chasisNumber: yup
      .string()
      .required()
      .min(17, "Enter a valid chasis numebr")
      .max(17, "Enter a valid chasis number"),
    modelName: yup.string().required(),
    seatingCapacity: yup.string().required(),
    standingCapacity: yup.string().required(),
    cyclinderCount: yup.string().required(),
    color: yup.string().required(),
    vehicleCost: yup.string().required(),
  })
  .required();

const EditVehicle = ({ vehicleID,type }) => {
  var history = new useHistory();

  const [isfetch, setIsFetch] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, SetLoading] = useState(true);
  // state for option
  const [Option, setOption] = useState(null);
  var subCategory = [];
  // handling options
  if (Option === "Motorized Two-Wheeler (2W)") {
    subCategory = [
      {
        Coption: "Two-stroke (2s) (2W 2s)",
      },
      {
        Coption: "Four-stroke (4s) (2W 4s)",
      },
    ];
  } else if (Option === "Four-wheelers (4W) (personal)") {
    subCategory = [
      {
        Coption: "Car",
      },
      {
        Coption: "Jeep",
      },
    ];
  } else if (Option === "Four-wheelers (4W) (inter-para transit)") {
    subCategory = [
      {
        Coption: "Taxi",
      },
    ];
  } else if (Option === "Motorized Three-Wheeler (3W)") {
    subCategory = [
      {
        Coption: "Two-stroke (2s) (3W 2s)",
      },
      {
        Coption: "Four-stroke (2s) (3W 2s)",
      },
    ];
  } else if (Option === "Public transport") {
    subCategory = [
      {
        Coption: "Bus",
      },
    ];
  } else if (Option === "Light commercial vehicle (LDV)") {
    subCategory = [
      {
        Coption: "Three-wheeler",
      },
    ];
  } else if (Option === "Heavy Diesel vehicle (HDV)") {
    subCategory = [
      {
        Coption: "Truck",
      },
    ];
  }

  const handleData = () => {
    axios.get(`/api/get-vehicle-info/${vehicleID}/${type}`).then(
      (res) => {
        if (res.status === 200) {
          setVehicleData(res.data.vehiclelist[0]);
        } else if (res.status === 401) {
          history.push("/admin/vehiclemanagement");
          swal("Error", res.data.message, "warning");
        }
        SetLoading(false);
      },
      function (error) {
        swal("Failure", "Connection Error", "error");
        return Promise.reject(error);
      }
    );
  };

  //get vehicle info
  useEffect(() => {
    setIsFetch(true);
  }, []);

  //form handler
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post(`/api/update-vehicle-info/${vehicleID}/${type}`, data).then(
      (res) => {
        if (res.data.status === 200) {
          swal("Success", res.data["message"], "success");
        } else if (res.data.status === 401) {
          swal("Warning", res.data["message"], "warning");
        }
      },
      function (error) {
        swal("Error", "Connection Error"+{error}, "error");
      }
    );
  };

  if (isfetch) {
    handleData();
    setIsFetch(false);
  }

   var TYPE_SPECIFIC_INPUTS = (
      <>
        <div className="col form-group">
          <label className="form-label text-secondary" htmlFor="vehicleUsage">
            Usage
          </label>
          <br />
          <div className="form-group">
            <select
              className="form-control form-control-lg"
              id="vehicleUsage"
              defaultValue={vehicleData["vehicleUsage"]}
              {...register("vehicleUsage")}
            >
              <option>Transport</option>
              <option>Health</option>
              <option>Escort</option>
              <option>surveillance</option>
              <option>Defence</option>
            </select>
          </div>
        </div>

        <div className="col form-group">
          <label className="form-label text-secondary" htmlFor="ownership">
            Ownership
          </label>
          <br />
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              id="ownership"
              defaultValue={vehicleData["ownership"]}
              {...register("ownership")}
            ></input>
          </div>
        </div>
      </>
    );

  if (isLoading) {
    return <Loading />;
  }

  if (vehicleData.length !== 0) {
    return (
      <div className="mx-5">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="container form">
            <div className="row row-cols-4">
              {VechicleRegistrationContent.inputs.map((input, key) => {
                return (
                  <div key={key} className="form-group">
                    <label
                      htmlFor={input.name}
                      className="form-label text-secondary"
                    >
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      id={input.name}
                      placeholder={input.placeholder}
                      defaultValue={vehicleData[input.name]}
                      className="form-control form-control-lg "
                      {...register(input.name)}
                    />
                    <p className="text-danger validation-warning">
                      {errors[input.name]?.message}
                    </p>
                  </div>
                );
              })}
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vechicleCategory"
                >
                  Vehicle Category
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="vechicleCategory"
                    defaultValue={vehicleData["vechicleCategory"]}
                    onClick={(e) => {
                      setOption(vehicleData["vechicleCategory"]);
                    }}
                    {...register("vechicleCategory")}
                  >
                    <option>Motorized Two-Wheeler (2W)</option>
                    <option>Four-wheelers (4W) (personal)</option>
                    <option>Four-wheelers (4W) (inter-para transit)</option>
                    <option>Motorized Three-Wheeler (3W)</option>
                    <option>Public transport</option>
                    <option>Light commercial vehicle (LDV)</option>
                    <option>Heavy Diesel vehicle (HDV)</option>
                  </select>
                </div>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="subCategory"
                >
                  Sub Category
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="subCategory"
                    defaultValue={vehicleData["subCategory"]}
                    {...register("subCategory")}
                  >
                    {subCategory.map((input, key) => {
                      return <option key={key}>{input.Coption}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col form-group">
                <label className="form-label text-secondary" htmlFor="fuelType">
                  Fuel Type
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="fuelType"
                    {...register("fuelType")}
                  >
                    {VechicleRegistrationContent.FOption.map((input, key) => {
                      return <option key={key}>{input.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="emissionCategory"
                >
                  Emission Category
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="emissionCategory"
                    defaultValue={vehicleData["emissionCategory"][0]}
                    {...register("emissionCategory")}
                  >
                    {VechicleRegistrationContent.EOption.map((input, key) => {
                      return <option key={key}>{input.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              {type===3?(TYPE_SPECIFIC_INPUTS):(<span></span>)}
            </div>
            <button className="btn btn-secondary my-2 " type="submit">
              Update Details
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="text-danger">
        <h3>No information is available to update</h3>
      </div>
    );
  }
};

export default EditVehicle;
