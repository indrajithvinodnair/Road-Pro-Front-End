import React from "react";
import { useForm } from "react-hook-form";
//import form components
import { AddUserContents } from "../../../static/asset/Content";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// importing for redirection
import { useHistory } from "react-router-dom";
// importing custom css
import "../../../static/css/pages.css";

//importing api handler
import axios from "axios";
//importing sweet alert
import swal from "sweetalert";

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    jurisdiction: yup.string().required(),
    station: yup.string().required(),
    email: yup.string().email("invalid email address").required(),
    username: yup.string().required(),
    phone: yup
      .string()
      .min(10, "Enter a valid phone number")
      .max(10, "Enter a valid phone number")
      .required("Contact no is a required field"),

    password: yup
      .string()
      .required("Password is a required field")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("required field"),
  })
  .required();

const AddUser = ({ role, value }) => {
  const history = new useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.role = value;
    data.status = 1;
    
    axios.post(`api/add-user`,data).then((res)=>{
      if (res.data["status"] === 201) {
        //history.push({role}+"/usermanagemnt");
        history.push("/admin/usermanagement");
        swal("Success", res.data["message"], "success");
      }else if (res.data["status"] === 400) {
        swal("User Exists", res.data["message"], "warning");
      }else{
        swal("Registration Error","connection failure", "error");
      }
    }).catch((error)=>{
      swal("Registration Error","connection failure", "error");
    })
    
  };

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container form">
          <div className="row row-cols-3">
            {AddUserContents.inputs.map((input, key) => {
              return (
                <div key={key} className="form-group">
                  <p>
                    <label
                      htmlFor={input.name}
                      className="form-label text-secondary"
                    >
                      {input.label}
                    </label>
                  </p>
                  <p>
                    <input
                      type={input.type}
                      id={input.name}
                      className="form-control form-control-lg "
                      {...register(input.name)}
                    />
                  </p>
                  <p className="text-danger validation-warning">
                    {errors[input.name]?.message}
                  </p>
                </div>
              );
            })}
          </div>
          <button className="btn btn-secondary" type="submit">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
