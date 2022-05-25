import React from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//axios
import axios from "axios";
import swal from "sweetalert";

//import form contents
import { UpdateContents } from "../../../static/asset/Crime";


const schema = yup
  .object()
  .shape({
    punishment_type: yup.string().required(),
    punishment_amount: yup.string().required(),
    infraction_name: yup.string().required(),
  })
  .required();

  


export default function EditcrimeInfo({ crimeData }) {
  
  


  const onSubmit = (data) => {

    data.infraction_id=crimeData['infraction_id'];
    axios.post(`/api/update-crime-info/${crimeData['infraction_id']}`, data).then(
        (res) => {
          if (res.data.status === 200) {
            swal("Success", res.data["message"], "success");
          } else if (res.data.status === 401) {
            swal("Warning", res.data["message"], "warning");
          }
        },
        function (error) {
          swal("Error", "Connection Error"+{error}, "error");
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
    <div>
      <div className="mx-5">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="container form">
            <div className="row row-cols-4">
              {UpdateContents.inputs.map((input, key) => {
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
                
            </div>
            <button className="btn btn-secondary my-2 " type="submit">
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
