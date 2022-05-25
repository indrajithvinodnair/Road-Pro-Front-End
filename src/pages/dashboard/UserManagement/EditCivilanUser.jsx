import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
//import api handler
import axios from "axios";
//import alert
import swal from "sweetalert";

//importing LoginContents
import { UpdateContents } from "../../../static/asset/Content";
// importing custom css
import "../../../static/css/pages.css";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import loading
import Loading from "../../../components/dashboard/Loading";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email("invalid email address").required(),
    userName: yup.string().required(),
    aadharNo: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Enter a valid aadhar number")
      .min(12, "Enter a valid aadahr numebr")
      .max(12, "Enter a valid aadhar number"),
    licenceNo: yup
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
    pinCode: yup
      .string("Enter a valid pin number")
      .required()
      .min(6, "invalid pin number")
      .max(6, "Enter a valid pin number"),
    dob: yup.string().required(),
  })
  .required();

const EditUser = ({ id }) => {
  var history = new useHistory();

  const [isfetch, setIsFetch] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, SetLoading] = useState(true);

  const handleData = () => {
    axios.get(`/api/get-user/${id}`).then(
      (res) => {
        if (res.status === 200) {
          setUserData(res.data.userslist[0]);
        } else if (res.status === 401) {
          history.push("/admin/usermanagement");
          swal("Error", res.data.message, "warning");
        }
        SetLoading(false);
      },
      function (error) {
        swal("Failure", "Connection Error", "error");
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    setIsFetch(true);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post(`/api/update-user/${id}`, data).then(
      (res) => {
        if (res.data.status === 200) {
          swal("Success", res.data["message"], "success");
        }else if (res.data.status === 422){
          swal("Warning", res.data["message"], "warning");
        }else if(res.data.status === 423){
          swal("Warning", res.data["message"], "warning");
        }
      },
      function (error) {
        swal("Error","Connection Error", "error");
      }
    );
  };

  if (isfetch) {
    handleData();
    setIsFetch(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container form">
          <div className="row row-cols-3">
            {UpdateContents.inputs.map((input, key) => {
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
                    defaultValue={userData[input.name]}
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
              <label className="form-label text-secondary" htmlFor="gender">
                Gender
              </label>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  id="gender"
                  defaultValue={userData.gender}
                  {...register("gender")}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
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
                  defaultValue={userData.state}
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
                defaultValue={userData.dob}
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
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
