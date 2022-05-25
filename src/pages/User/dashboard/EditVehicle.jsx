import React, { useState } from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//axios
import axios from "axios";
import swal from "sweetalert";

//import form contents
import { UserVehicleUpdateContent } from "../../../static/asset/Vechicle";


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
    seatingCapacity: yup.string().required(),
    cyclinderCount: yup.string().required(),
    color: yup.string().required(),
  })
  .required();

const EditVehicle = ({ vehicleData }) => {

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



  //form handler
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    data.vehicleID = vehicleData["vehicleID"];
    axios.post(`/api/update-vehicle-info`, data).then(
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

  return (
    <div className="mx-5">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <div className="container form">
          <div className="row row-cols-4">
            {UserVehicleUpdateContent.inputs.map((input, key) => {
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
          </div>
          <button className="btn btn-secondary my-2 " type="submit">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
