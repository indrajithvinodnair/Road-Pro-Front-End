import React from "react";
import { useForm } from "react-hook-form";
//importing api handler
import axios from "axios";
// importing for redirection
import { useHistory } from "react-router-dom";

//importing sweet alert
import swal from "sweetalert";

//importing LoginContents
import { RegisterContents } from "../../../static/asset/Content";
// importing custom css
import "../../../static/css/pages.css";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email("invalid email address").required(),
    username: yup.string().required(),
    aadhar: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Enter a valid aadhar number")
      .min(12, "Enter a valid aadahr numebr")
      .max(12, "Enter a valid aadhar number"),
    licence: yup
      .string()
      .required()
      .min(15, "Enter a valid licence numebr")
      .max(15, "Enter a valid licence number"),
    phone: yup
      .string()
      .min(10, "Enter a valid phone number")
      .max(10, "Enter a valid phone number")
      .required("Contact no is a required field"),
    address: yup.string().required(),
    pin: yup
      .string("Enter a valid pin number")
      .required()
      .min(6, "invalid pin number")
      .max(6, "Enter a valid pin number"),

    password: yup
      .string()
      .required("required field")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("required field"),

    dob: yup.string().required(),
  })
  .required();

const RegisterUser = () => {
  var history = new useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // explicitly definig status and role
    data.status = 0;
    data.role = 4;
    data.licencestatus = 0;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/register`, data).then((res) => {
        if (res.data["status"] === 201) {
          swal("Success", res.data["message"], "success");
          history.push("/admin/usermanagement");
        } else if (res.data["status"] === 400) {
          swal("User Exists", res.data["message"], "warning");
        } else {
          swal("Registration Error", res.data["message"], "error");
        }
      });
    });
  };

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container form">
          <div className="row row-cols-3">
            {RegisterContents.inputs.map((input, key) => {
              return (
                <div key={key} className="col">
                  <label
                    htmlFor={input.name}
                    className="form-label text-secondary"
                  >
                    {input.label}
                  </label>

                  <input
                    type={input.type}
                    id={input.name}
                    className="form-control form-control-lg"
                    {...register(input.name)}
                  />
                  <p className="text-danger validation-warning">
                    {errors[input.name]?.message}
                  </p>
                </div>
              );
            })}
            <div className="col">
              <label className="form-label text-secondary">Gender</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  {...register("gender")}
                  id="female"
                  value="F"
                  checked
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  {...register("gender")}
                  id="male"
                  value="M"
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  {...register("gender")}
                  id="other"
                  value="O"
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <div className="col">
              <label className="form-label text-secondary" htmlFor="state">
                State
              </label>
              <br />
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  id="state"
                  {...register("state")}
                >
                  <option>Kerala</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                </select>
              </div>
            </div>
            <div className="col">
              <label className="form-label text-secondary" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="form-control form-control-lg"
                type="date"
                {...register("dob")}
                id="dob"
                placeholder="dd/mm/yyyy"
              />
              <p className="text-danger validation-warning">
                {errors["dob"]?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="form">
          <button className="btn btn-secondary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
