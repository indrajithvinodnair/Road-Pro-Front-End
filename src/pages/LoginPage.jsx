import React from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from 'react-router-dom';
//importing api handler
import axios from "axios";


//importing sweet alert
import swal from "sweetalert";

//importin custom components
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
//importing LoginContents
import { LoginContents } from "../static/asset/Content";
// importing custom css
import "../static/css/pages.css";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//validation code
const schema = yup.object().shape({
    user: yup.string().required("username or email is required"),
    password: yup.string().required(),
  }).required();

const LoginPage = () => {
  // redirection
  var history = new useHistory();
  // form handling code
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, data).then((response) => {
        if (response.data["status"] === 200) {
          // currently logined user information
          localStorage.setItem("auth_token", response.data["token"]);
          localStorage.setItem("auth_name", response.data["username"]);
          localStorage.setItem("auth_role", response.data["role"]); 

          swal("Success", response.data["message"], "success");
          // conditional redirect on basis of role
          if (response.data['role'] === "admin") {
            history.push("/admin/dashboard");
          } else if (response.data['role'] === "user") {
            history.push("/user/dashboard");
          } else if(response.data['role'] === "rto"){
            history.push("/rto/dashboard");
          }else if(response.data['role'] === "traffic"){
            history.push("/traffic/dashboard");
          }else if(response.data['role'] === "civil"){
            history.push("/civil/dashboard");
          }
        } else if (response.data["status"] === 401) {
          swal("Error", response.data["message"], "warning");
        } else {
          swal("Unsuccessful", response.data["message"], "warning");
        }
      },function (error) {
        swal("Failure", "Connection Error", "error");
        return Promise.reject(error);
      }
      );
    });
  };

  return (
    <div className="content" style={{
      width: "100%",
    }} >
      <MainNavbar />
      <div className="Apps bg-dark text-light">
        <form onSubmit={handleSubmit(onSubmit)} className="col-4 md">
          {LoginContents.inputs.map((input, key) => {
            return (
              <div key={key} className="form-group">
                <p>
                  <label htmlFor={input.name} className="form-label text-secondary">{input.label}</label>
                </p>
                <p>
                  <input
                    type={input.type}
                    id={input.name}
                    className="form-control form-control-lg"
                    {...register(input.name)}
                  />
                </p>
                <p className="text-danger validation-warning">{errors[input.name]?.message}</p>
              </div>
            );
          })}
          <button className="btn btn-secondary" type="submit">
            Login
          </button>
         
          <Link to="/register" style={{ textDecoration: 'none' }}>
          <span className="content text-light" >Not a registered User &nbsp; <button className="btn btn-primary">Register Here</button></span>
          </Link>
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <span className="content text-light my-2" >Click <u>here</u> if you Forgot Password &nbsp;</span>
          </Link>
        </form>
      </div>
      <MainFooter />
    </div>
  );
};

export default LoginPage;
