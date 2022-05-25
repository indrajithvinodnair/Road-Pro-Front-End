import React from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//axios
import axios from "axios";
import swal from "sweetalert";

import { trafficDetails } from "../../../static/asset/Crime";

const schema = yup
  .object()
  .shape({
    Aadhar: yup
      .string()
      .min(12, "valid aadhar required")
      .max(12, "valid aadhar required")
      .required(),
    infraction_id: yup.string().required(),
    date_issued: yup.string().required(),
  })
  .required();

const EditTrafficData = ({ crimeData }) => {
  const onSubmit = (data) => {
    data.Id = crimeData.Id;
    data.officer_id = crimeData.officer_id;
    data.vehicle_id = crimeData.vehicle_id;
    axios.post(`/api/log-crime-info`,data).then((res)=>{
        if (res.data.status === 200) {
            swal("Success", res.data["message"], "success");
          } else if (res.data.status === 401) {
            swal("Warning", res.data["message"], "warning");
          }
    },(error)=>{
        swal("Error","connection error","error");
    });

  };

  //form handler
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <div className="mx-5">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="container form">
            <div className="row row-cols-4">
              {trafficDetails.map((input, key) => {
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
                      defaultValue={crimeData[input.name]}
                      className="form-control form-control-lg "
                      {...register(input.name)} //value key pair
                    />
                    <p className="text-danger validation-warning">
                      {errors[input.name]?.message}
                    </p>
                  </div>
                );
              })}
              <div className="col">
                <label htmlFor="status" className="form-label text-secondary">
                  Case Status
                </label>
                <select
                  id="status"
                  className="form-control-lg"
                  {...register("status")}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
                
              </div>
            </div>
            <button className="btn btn-secondary my-2 " type="submit">
              Update Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTrafficData;
