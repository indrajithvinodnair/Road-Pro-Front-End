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
    ownership: yup.string().max(50, "exceeded max limit").required(),
    vehicleUsage: yup.string().required(),
  })
  .required();

const RegisterOfficial = () => {
  // redirection
  var history = new useHistory();
  // for handling image error, server side validation
  const [errorlist, setError] = useState([]);
  // state for handling api call
  const [isfetch, setIsFetch] = useState(false);
  // state for image
  const [picture, setPicture] = useState([]);

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

  useEffect(() => {
    setIsFetch(true);
  }, []);

  if (isfetch) {
    setIsFetch(false);
  }

  const handleImage = (e) => {
    var name = e.target.name;
    var data = {};
    data[name] = e.target.files[0];
    for (let i = 0; i < picture.length; i++) {
      if (picture[i].hasOwnProperty(name)) {
        picture.splice(i, 1);
      }
    }
    setPicture([...picture, data]);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // require efficient code to manage the process.
    var front = picture.map(({ vehicleFront }) => vehicleFront);
    var rear = picture.map(({ vehicleRear }) => vehicleRear);
    var leftside = picture.map(({ vehicleSideLeft }) => vehicleSideLeft);
    var rightside = picture.map(({ vehicleSideRight }) => vehicleSideRight);
    // explict assignment
    for (let i = 0; i <= 3; i++) {
      if (front[i] !== undefined) {
        data.vehicleFront = front[i];
      }
      if (leftside[i] !== undefined) {
        data.vehicleSideLeft = leftside[i];
      }
      if (rightside[i] !== undefined) {
        data.vehicleSideRight = rightside[i];
      }
      if (rear[i] !== undefined) {
        data.vehicleRear = rear[i];
      }
    }

    // add data for access field and aadhar field
    data.aadharNo = null;
    data.vehicleAccess = 3;
    data.vehicleStatus = 0;

    var formdata = new FormData();
    // appending values to form data
    formdata.append("vehicleFront", data.vehicleFront);
    formdata.append("vehicleRear", data.vehicleRear);
    formdata.append("vehicleSideLeft", data.vehicleSideLeft);
    formdata.append("vehicleSideRight", data.vehicleSideRight);
    formdata.append("aadharNo", data.aadharNo);
    formdata.append("plateNumber", data.plateNumber);
    formdata.append("engineNumber", data.engineNumber);
    formdata.append("regDate", data.regDate);
    formdata.append("manDate", data.manDate);
    formdata.append("chasisNumber", data.chasisNumber);
    formdata.append("modelName", data.modelName);
    formdata.append("vechicleCategory", data.vechicleCategory);
    formdata.append("subCategory", data.subCategory);
    formdata.append("emissionCategory", data.emissionCategory);
    formdata.append("seatingCapacity", data.seatingCapacity);
    formdata.append("standingCapacity", data.standingCapacity);
    formdata.append("cyclinderCount", data.cyclinderCount);
    formdata.append("fuelType", data.fuelType);
    formdata.append("color", data.color);
    formdata.append("vehicleAccess", data.vehicleAccess);
    formdata.append("vechicleStatus", data.vechicleStatus);
    formdata.append("vehicleCost", data.vehicleCost);
    formdata.append("ownership", data.ownership);
    formdata.append("vehicleUsage", data.vehicleUsage);

    axios.post(`/api/register-vehicle-nonuser/3`, formdata).then(
      (res) => {
        if (res.data["status"] === 200) {
          swal("Success", res.data["message"], "success");
          setError([]);
          history.push("/admin/vehiclemanagement");
        } else if (res.data["status"] === 422) {
          swal("Image Fileds are Mandatory", "", "warning");
          setError(res.data.errors);
        } else if (res.data["status"] === 401) {
          swal("Error", res.data["message"], "error");
        }
      },
      function (error) {
        swal("Error", "Connection Error", "error");
      }
    );
  };

  return (
    <>
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
                <label className="form-label text-secondary" htmlFor="vehicleUsage">
                    Usage
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="vehicleUsage"
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
                    {...register("ownership")}
                  />
                     <p className="text-danger validation-warning">
                      {errors["ownership"]?.message}
                    </p>
                </div>
              </div>

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
                    onClick={(e) => {
                      setOption(
                        document.getElementById("vechicleCategory").value
                      );
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
                    {...register("emissionCategory")}
                  >
                    {VechicleRegistrationContent.EOption.map((input, key) => {
                      return <option key={key}>{input.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vehicleFront"
                >
                  Vehicle Front Photo
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="vehicleFront"
                  name="vehicleFront"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">
                  {errorlist.vehicleFront}
                </p>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vehicleRear"
                >
                  Vehicle Rear Photo
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="vehicleRear"
                  name="vehicleRear"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">
                  {errorlist.vehicleRear}
                </p>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vehicleSideLeft"
                >
                  Vehicle Side (Left) Photo
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="vehicleSideLeft"
                  name="vehicleSideLeft"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">
                  {errorlist.vehicleSideLeft}
                </p>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vehicleSideRight"
                >
                  Vehicle Side (Right) Photo
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="vehicleSideRight"
                  name="vehicleSideRight"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">
                  {errorlist.vehicleSideRight}
                </p>
              </div>
            </div>
            <hr />
            <button className="btn btn-secondary my-2 " type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterOfficial;
