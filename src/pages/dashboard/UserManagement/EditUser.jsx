import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
//import api handler
import axios from "axios";
//import alert
import swal from "sweetalert";

//importing user contents
import { UpdateUserContents } from "../../../static/asset/Content";
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
    jurisdiction: yup.string().required(),
    station: yup.string().required(),
    email: yup.string().email("invalid email address").required(),
    userName: yup.string().required(),
    phone: yup
      .string()
      .min(10, "Enter a valid phone number")
      .max(10, "Enter a valid phone number")
      .required("Contact no is a required field"),
  })
  .required();

const EditUser = ({ id }) => {
  
  var history = new useHistory();

  const [isfetch, setIsFetch] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, SetLoading] = useState(true);

  const handleData = () => {
    axios.get(`/api/get-official-info/${id}`).then(
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
    axios.post(`/api/update-official-info/${id}`, data).then(
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
            {UpdateUserContents.inputs.map((input, key) => {
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
                      defaultValue={userData[input.name]}
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
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
