import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import MainLayout from "../components/dashboard/MainLayout";
// importing api handler
import axios from "axios";
// importing loading component
import Loading from "../components/dashboard/Loading";

//importing sweet alert
import swal from "sweetalert";

const UserRoutes = ({ ...rest }) => {
  const [authenticated, setauthenticated] = useState(false);
  const [loading, setloading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    axios.get("/api/authCheckUser").then((res) => {
      if (res.status === 200) {
        setauthenticated(true);
      }
      setloading(false);
    });
    return () => {
      setauthenticated(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        swal("Unauthorized Access", err.response.data.message, "warning");
        history.push("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
     (response) => {
      return response;
    },
     (error) => {
      if (error.response['status'] === 403) { // access deined
        swal("Forbidden", error.response.data.message, "warning");
        history.push("/403");
      } else if (error.response.status === 404) { // page not found
        swal("404 error", error.response.data.message, "warning");
        history.push("/404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return (
      <div
        style={{
          paddingTop: "450px",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ props, location }) =>
        authenticated ? (
          <MainLayout {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default UserRoutes;
