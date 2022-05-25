import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";

// json web token
import jwt from "jsonwebtoken";
// api handler
import axios from "axios";

//importing sweet alert
import swal from "sweetalert";

//importin custom components
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
//importing LoginContents
import { RestContent } from "../static/asset/Content";
// importing custom css
import "../static/css/pages.css";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//validation code
const schema = yup
  .object()
  .shape({
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
  })
  .required();

const ResetPassword = () => {
  // redirection
  const [fetchflag, setFetchFlag] = useState(false);
  const [userData, setUserData] = useState([]);
  const [complete, setComplete] = useState(false); // redundent code ,more optimized available
  const [access, setAccess] = useState(false);
  var { id, token } = useParams();
  const history = useHistory();
  const JWT_SECRET = "roadpro"; // should be kept in a env file

  // form handling code
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const checkID = (id) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.get(`/api/validate-user/${id}`).then(
        (response) => {
          if (response.data["status"] === 200) {
            setUserData(response.data.user);
            setComplete(true);
          } else {
            swal("Failure", "INVALID LINK", "error");
            history.push("/login");
          }
        },
        function (error) {
          swal("Failure", "Connection Error", "error");
          history.push("/");
        }
      );
    });
  };

  const onSubmit = (data) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/`, data).then(
        (response) => {
          if (response.data["status"] === 200) {
          } else {
            swal("warning", "Not a Registered email", "warning");
          }
        },
        function (error) {
          swal("Failure", "Connection Error", "error");
          return Promise.reject(error);
        }
      );
    });
  };

  useEffect(() => {
    setFetchFlag(true);
  }, []);

  if (fetchflag) {
    checkID(id);
    if (complete) {
      const secret = JWT_SECRET + userData.password;
      token = JSON.stringify(token);
      try {
        // token verification
        const payload = jwt.verify(token, secret);
        setAccess(true);
      } catch (error) {
        // handle error alert and redirection
        swal("Error", error.message, "error");
        history.push("/login");
      }
    }
    setFetchFlag(false);
  }

  return (
    <>
      {access ? (
        <div
          className="content"
          style={{
            width: "100%",
          }}
        >
          <MainNavbar />
          <h3 className="text-light "> Rest Password </h3>
          <div className="Apps bg-dark text-light">
            <h3 className="text-warning"> Hello {userData.userName} </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="col-4 md">
              {RestContent.inputs.map((input, key) => {
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
                        className="form-control form-control-lg"
                        {...register(input.name)}
                      />
                    </p>
                    <p className="text-danger validation-warning">
                      {errors[input.name]?.message}
                    </p>
                  </div>
                );
              })}
              <button className="btn btn-secondary" type="submit">
                Submit
              </button>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span className="content text-light">
                  Not a registered User &nbsp;{" "}
                  <button className="btn btn-primary">Register Here</button>
                </span>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="content text-light">
                  Already a user ? &nbsp;{" "}
                  <button className="btn btn-primary">Login Here</button>
                </span>
              </Link>
            </form>
          </div>
          <MainFooter />
        </div>
      ) : (
        <div>Not accessible {console.log(access)}</div>
      )}
    </>
  );
};

export default ResetPassword;
