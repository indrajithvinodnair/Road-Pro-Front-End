import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import {
  accidentDetails,
  accidentVehicleDetails,
} from "../../../../static/asset/Crime";

// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//axios
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../../../components/dashboard/Loading";
import { GetCurrentDate } from "../../../../components/functions/GetCurrentDate";

const schema = yup
  .object()
  .shape({
    cause: yup.string().required(),
    place: yup.string().required(),
    primaryInfo: yup
      .string()
      .required()
      .min(10, "character limit exceeded")
      .max(40, "max limit exceeded"),
  })
  .required();

const RegisterAccident = ({ type, vehicleID }) => {
  // state for image
  const [picture, setPicture] = useState([]);
  // for handling image error, server side validation
  const [errorlist, setError] = useState([]);
  const [officerName] = useState(localStorage.getItem("auth_name"));
  const [fetch, setFetch] = useState(false);
  const [officerData, setOfficerData] = useState([]);
  const [content, setContent] = useState([]);
  const [isloading, setLoading] = useState(true);

  var history = useHistory();

  const getOfficerInfo = () => {
    axios.get(`/api/get-official-details/${officerName}`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setOfficerData(res.data.officerId[0]);
          setLoading(false);
        } else if (res.data["status"] === 401) {
          history.push("civil/vehicleaccident");
        }
      },
      (error) => {
        swal("error", "connection error", "error");
      }
    );
  };

  useEffect(() => {
    setFetch(true);
  }, []);

  if (fetch) {
    getOfficerInfo();

    if (type === "1") {
      setContent(accidentVehicleDetails);
    } else if (type === "2") {
      setContent(accidentDetails);
    }

    setFetch(false);
  }

  const handleImage = (e) => {
    var name = e.target.name;
    var data = {};
    data[name] = e.target.files[0];
    for (let i = 0; i < picture.length; i++) {
      if (picture[i].hasOwnProperty(name)) {
        picture.splice(i, 1);
      }
    }
    setPicture([...picture, data]);
  };

  const onSubmit = (data) => {
    var proof1 = picture.map(({ accidentPic1 }) => accidentPic1);
    var proof2 = picture.map(({ accidentPic2 }) => accidentPic2);

    for (let i = 0; i <= 1; i++) {
      if (proof1[i] !== undefined) {
        data.accidentPic1 = proof1[i];
      }
      if (proof2[i] !== undefined) {
        data.accidentPic2 = proof2[i];
      }
    }
    data.accidentType = type;
    data.officerId = officerData.uId;
    data.vehicleID = vehicleID;
    data.date = GetCurrentDate();

    // create form datas
    var formdata = new FormData();

    formdata.append("accidentType", data.accidentType);
    formdata.append("officerId", data.officerId);
    formdata.append("date", data.date);
    formdata.append("accidentPic2", data.accidentPic2);
    formdata.append("accidentPic1", data.accidentPic1);
    formdata.append("vehicleID", data.vehicleID);
    formdata.append("cause", data.cause);
    formdata.append("place", data.place);
    formdata.append("primaryInfo", data.primaryInfo);
    formdata.append("damage", data.damage);

    if (type === "1") {
        formdata.append("plateNo", data.plateNo);
        formdata.append("ownerFirst", data.ownerFirst);
        formdata.append("ownerLast", data.ownerLast);
      } else if (type === "2") {
        formdata.append("victimFirstName", data.victimFirstName);
        formdata.append("victimLastName", data.victimLastName);
        formdata.append("victimAge", data.victimAge);
        formdata.append("victimAge", data.victimAge);
      }
    
    axios.post(`/api/log-new-accident/${type}`, formdata).then(
      (res) => {
        if (res.data["status"] === 200) {
          swal("Success", res.data["message"], "success");
          setError([]);
        } else if (res.data["status"] === 422) {
          swal("Image Fileds are Mandatory", "", "warning");
          setError(res.data.errors);
        } else if (res.data.status === 401) {
          swal("Error", "Logging failed", "error");
        }
      },
      function (error) {
        swal("Error", "Connection Error", "error");
      }
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (isloading) {
    return <Loading />;
  } else {
    return (
      <div className="mx-5">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="container form">
            <div className="row row-cols-2">
              <div className="col form-group">
                <label className="form-label text-secondary" htmlFor="cause">
                  Cause of accident
                </label>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="cause"
                    {...register("cause")}
                  >
                    <option>Speeding</option>
                    <option>Drunk Driving</option>
                    <option>Reckless Driving</option>
                    <option>Inclement Weather</option>
                    <option>Running Intersections</option>
                    <option>calamity</option>
                  </select>
                </div>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="primaryInfo"
                >
                  Primary Info
                </label>
                <br />
                <div className="form-group">
                  <textarea
                    id="primaryInfo"
                    type="text"
                    className="form-control form-control-lg"
                    {...register("primaryInfo")}
                  />
                </div>
                <p className="text-danger validation-warning">
                  {errors["primaryInfo"]?.message}
                </p>
              </div>
              <div className="col form-group">
                <label className="form-label text-secondary" htmlFor="place">
                  place
                </label>
                <br />
                <div className="form-group">
                  <input
                    id="place"
                    className="form-control form-control-lg"
                    {...register("place")}
                  />
                </div>
                <p className="text-danger validation-warning">
                  {errors["place"]?.message}
                </p>
              </div>
              <div className="col"></div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="accidentPic1"
                >
                  Accident Proof 1
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="accidentPic1"
                  name="accidentPic1"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">{errorlist.accidentPic1}</p>
              </div>
              <div className="col form-group">
                <label
                  className="form-label text-secondary"
                  htmlFor="accidentPic2"
                >
                  Accident Proof 2
                </label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  id="accidentPic2"
                  name="accidentPic2"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImage}
                />
                <p className="text-danger validation-warning">{errorlist.accidentPic2}</p>
              </div>
              {content.map((input, key) => {
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
            <hr />
            <button className="btn btn-secondary my-2 " type="submit">
              Log Accident
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default RegisterAccident;
