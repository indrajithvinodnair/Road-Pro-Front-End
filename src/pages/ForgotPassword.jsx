import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';


// json web token
import jwt from 'jsonwebtoken';
// api handler
import axios from 'axios';

//importing sweet alert
import swal from "sweetalert";

//importin custom components
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
//importing LoginContents
import { ForgotContent } from "../static/asset/Content";
// importing custom css
import "../static/css/pages.css";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//validation code
const schema = yup.object().shape({
    user: yup.string().email().required("Valid Email is required"),
  }).required();

const ForgotPassword = () => {
  // redirection
  const [fetchflag, setFetchFlag] = useState(false);
  
  const [userData, setUserData] = useState([]);
  const JWT_SECRET = "roadpro"; // should be kept in a env file

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
        axios.post(`/api/validate-email`, data).then((response) => {
          if (response.data["status"] === 200) {
            setUserData(response.data.user);
            setFetchFlag(true);
          }else{
              swal("warning","Not a Registered email", "warning");
          }
        },function (error) {
          swal("Failure", "Connection Error", "error");
          return Promise.reject(error);
        }
        );
      });
  };

  if(fetchflag){
    const secret = JWT_SECRET + userData.password;
    const payload = {
        email:userData.email,
        userid:userData.uId,
    }
    const token = jwt.sign(payload,secret,{expiresIn: '15m'});
    const link = `http://localhost:3000/reset-password/${userData.uId}/${token}`;
    // mailing process
    console.log(link);
    swal("succes","Rest link has been set to your email", "success");
  }



  return (
    <div className="content" style={{
      width: "100%",
    }} >
      <MainNavbar />
      <div className="Apps bg-dark text-light">
        <form onSubmit={handleSubmit(onSubmit)} className="col-4 md">
          {ForgotContent.inputs.map((input, key) => {
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
            Submit
          </button>
          <Link to="/register" style={{ textDecoration: 'none' }}>
          <span className="content text-light" >Not a registered User &nbsp; <button className="btn btn-primary">Register Here</button></span>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className="content text-light" >Already a user ? &nbsp; <button className="btn btn-primary">Login Here</button></span>
          </Link>
        </form>
      </div>
      <MainFooter />
    </div>
  );
};

export default ForgotPassword;
