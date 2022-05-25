import React, { useEffect, useState} from "react";

import { useForm } from "react-hook-form";
// validation handlers
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//axios
import axios from "axios";
import swal from "sweetalert";
import Loading from '../../../components/dashboard/Loading';

// import contents
import { TrafficCrimeContents } from "../../../static/asset/Crime";

const schema = yup
  .object()
  .shape({
    Aadhar: yup
      .string()
      .min(12, "valid aadhar required")
      .max(12, "valid aadhar required")
      .required(),
    date_issued: yup.string().required("Required"),
  })
  .required();

export default function Addcase({ vehicleID }) {
  
  const [fetch, setFetch] = useState(false);
  const [infractions, setInfractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      setFetch(true);
  },[])

  const getInfractons = () => {
    axios.get(`/api/get-infractions`).then(
        (res) => {
          if (res.data.status === 200) {
            setInfractions(res.data.infractions);
            setLoading(false);
          } 
        },
        (error) => {
          swal("Error", "connection error", "error");
        }
      );
  }

  if(fetch){
      getInfractons();
      setFetch(false);
  }

  const onSubmit = (data) => {
    data.officerName = localStorage.getItem('auth_name');
    data.vehicle_id = vehicleID;
    data.status = 0; // active case
    axios.post(`/api/add-traffic-case`, data).then(
      (res) => {
        if (res.data.status === 200) {
          swal("Success", res.data["message"], "success");
        }
      },
      (error) => {
        swal("Error", "connection error", "error");
      }
    );
  };
  //form handler
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  if(loading){
    return (<Loading />);
  }else{
    console.log(infractions);
    return (
        <>
          <div className="mx-5">
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
              <div className="container form">
                <div className="row row-cols-4">
                  {TrafficCrimeContents.map((input, key) => {
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
                          placeholder={input.placeholder}
                          className="form-control form-control-lg "
                          {...register(input.name)} //value key pair
                        />
                        <p className="text-danger validation-warning">
                          {errors[input.name]?.message}
                        </p>
                      </div>
                    );
                  })}
                  <div className="col">
                    <label htmlFor="infraction_id" className="form-label text-secondary">
                       Infractions
                    </label>
                    <select
                      id="status"
                      className="form-control-lg"
                      {...register("infraction_id")}
                    >
                     {infractions.map((index, id)=>{
                        return <option key={id} value={index.infraction_id}>{index.infraction_name}</option>
                     })}
                    </select>
                  </div>
                </div>
                <button className="btn btn-secondary my-2 " type="submit">
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </>
      );
  }
}
