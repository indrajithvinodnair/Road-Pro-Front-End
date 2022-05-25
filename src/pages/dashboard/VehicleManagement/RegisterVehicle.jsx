import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//axios
import axios from "axios";
import swal from "sweetalert";

// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  })
  .required();

const RegisterVehicle = ({ handler, type }) => {
  // for handling image error, server side validation
  const [errorlist, setError] = useState([]);
  // state for handling aadhar numeber of users
  const [userData, setUserData] = useState([]);
  // state for handling api call
  const [isfetch, setIsFetch] = useState(false);
  // state for image
  const [picture, setPicture] = useState([]);
  // state for owner validation
  const [owner, setOwner] = useState(false);
  // haveAddahr state
  const [aadharExist, setAadharExist] = useState(false);
  // modal for adding vehicles
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const handleRegisterFormShow = () => setShowRegisterForm(true);
  // gets the current user name from the auth_token
  const [userName] = useState(localStorage.getItem("auth_name"));
  // sets the users aadhar numbered
  const [aadhar, setAadhar] = useState(null);

  const handleRegisterFormClose = () => {
    setShowRegisterForm(false);
  };
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

  // getting aadhar informtion of 'verified' users

  const getUserData = () => {
    if (handler === "admin" && type === 1) {
      axios.get(`/api/get-aadhar-info`).then(
        (res) => {
          if (res.status === 200) {
            setUserData(res.data.aadharlist);
          } else if (res.status === 401) {
            swal("Warning", res.data.message, "warning");
          }
        },
        function (error) {
          swal("Failure", "Connection Error", "error");
          return Promise.reject(error);
        }
      );
    }
  };

  const getUserAadhar = () => {
    if (handler === "user" && type === 1) {
      axios.get(`/api/get-user-aadhar/${userName}`).then(
        (res) => {
          if (res.status === 200) {
            setAadhar(res.data["AadharNumber"]);
          } else if (res.status === 401) {
            swal("Warning", res.data.message, "warning");
          }
        },
        function (error) {
          swal("Failure", "Connection Error", "error");
          return Promise.reject(error);
        }
      );
    }
  };

  useEffect(() => {
    setIsFetch(true);
    if (type === 2) {
      setOwner(true);
    }
  }, [type]);

  if (isfetch) {
    if (handler === "user") {
      getUserAadhar();
    } else {
      getUserData(); // call to get aadhar info
    }
    setIsFetch(false);
  }

  if (owner) {
    handleRegisterFormShow();
    setOwner(false);
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

    if (type === 1) {
      data.vehicleAccess = 1; // registerd user,
    } else if (type === 2) {
      data.vehicleAccess = 2; // non registered user ,

      if (aadharExist) {
        // without aadhar
        data.aadharNo = null;
      }
    }

    data.vehicleStatus = 0;

    // data.aadharnumber = aadhar number of current user, if handler==user
    if (handler === "user") {
      data.aadharNo = aadhar;
    }

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

    var apiLink = `/api/register-vehicle-nonuser/${type}`;
    if (handler === "user") {
      apiLink = `/api/register-vehicle-user/${type}`;
    }

    axios.post(apiLink, formdata).then(
      (res) => {
        if (res.data["status"] === 200) {
          swal("Success", res.data["message"], "success");
          setError([]);
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
  //if the handler is a user
  if (handler === "admin" && type === 1) {
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
                <label className="form-label text-secondary" htmlFor="aadharNo">
                  Verified Aadhar No
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="aadharNo"
                    {...register("aadharNo")}
                  >
                    {userData.map((aadhar, id) => {
                      return (
                        <option key={id} value={aadhar.aadharNo}>
                          {aadhar.aadharNo}
                        </option>
                      );
                    })}
                  </select>
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
    );
  } else if (handler === "user" && type === 1) {
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
              <div className="col form-group"></div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="vehicleFront"
                >
                  Vehicle Front
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
                  Vehicle Rear
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
                  Vehicle Side (Left)
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
                  Vehicle Side (Right)
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
    );
  } else if (type === 2) {
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
                  <label
                    className="form-label text-secondary"
                    htmlFor="aadharNo"
                  >
                    Aadhar No
                  </label>
                  <br />
                  <div className="form-group">
                    {aadharExist === true ? (
                      <input
                        className="form-control form-control-lg"
                        id="aadharNo"
                        defaultValue="000000000000"
                        disabled={aadharExist}
                      ></input>
                    ) : (
                      <>
                        {" "}
                        <input
                          className="form-control form-control-lg"
                          id="aadharNo"
                          {...register("aadharNo")}
                        ></input>
                        <p>{errorlist.aadharNo}</p>{" "}
                      </>
                    )}
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
                  <label
                    className="form-label text-secondary"
                    htmlFor="fuelType"
                  >
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
        <Modal
          animation="true"
          show={showRegisterForm}
          backdrop="static"
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Log Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="btn mx-5 mt-5 float-start btn-primary"
              onClick={() => {
                setAadharExist(false);
                handleRegisterFormClose();
              }}
            >
              OwnerShip is Known
            </Button>
            <Button
              variant="btn mx-5 mt-5 float-end btn-danger"
              onClick={() => {
                setAadharExist(true);
                handleRegisterFormClose();
              }}
            >
              OwnerShip is UnKnown
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default RegisterVehicle;
