import React from "react";
import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//axios
import axios from "axios";
import swal from "sweetalert";

//import form contents
import { AddContents } from "../../../static/asset/Crime";

const schema = yup
  .object()
  .shape({
    punishment_type: yup.string().required(),
    punishment_amount: yup.string().required(),
    infraction_name: yup.string().required(),
  })
  .required();

export default function AddcrimeInfo() {

    const onSubmit = (data) => {

        
        axios.post(`/api/add-crime-info/${data.infraction_id}`, data).then(
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
           <div>
      <div className="mx-5">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="container form">
            <div className="row row-cols-4">
              {AddContents.inputs.map((input, key) => {
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
                      defaultValue={input.placeholder}
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
             Add Crime
            </button>
          </div>
        </form>
      </div>
    </div>
            
        </div>
    )
}
