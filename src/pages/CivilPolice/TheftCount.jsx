import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Table,
  CardContent,
  H3,
  H4,
  ProgressCircular,
} from "ui-neumorphism";


import swal from "sweetalert";

import axios from "axios";

import { overrideThemeVariables } from "ui-neumorphism";
overrideThemeVariables({
  "--light-bg": "#fff",
  "--light-bg-dark-shadow": "#212f4d",
  "--light-bg-light-shadow": "#B9BDBF",
  "--dark-bg": "#bdb9b9",
  "--dark-bg-dark-shadow": "#000000",
  "--dark-bg-light-shadow": "#6e7172",
  "--primary": "#c91ec4",
  "--primary-dark": "#4526f9",
  "--primary-light": "#c7befd",
});

const TheftCount = () => {
  const [fetch, setFetch] = useState(false);
  const [counter, setcounter] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    setFetch(true);
  }, []);

  const getData = () => {
    axios.get(`/api/get-theft-count`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setcounter(res.data.countlist);
          setLoading(false);
        }
      },
      (err) => {
        swal("Error", "Connection Error", "error");
      }
    );
  };

  if (fetch) {
    getData();
    setFetch(false);
  }

    function createItem(Total, Active, Inactive) {
      return { Total, Active, Inactive };
    }

    const headers = [
      { text: "Total Cases", align: "center", value: "Total" },
      { text: "Active Cases", align: "center", value: "Active" },
      { text: "Inactive Cases", align: "center", value: "Inactive" },
    ];

    const items = [createItem(counter[0], counter[2], counter[1])];

    return (
      <>
        <Card dark={false} elevation={1} height={300} width={700}>
          <H4 className="text-center text-primary m-4">
            Vehicle Theft Statistics
          </H4>
          <CardContent>
          {isloading?(<span className="text-center mx-2"> <ProgressCircular indeterminate color="var(--warning)" /></span>):( <Table items={items} headers={headers} />)}
            <div className="text-center mt-4">
              <Link to="/civil/vehicletheft">
                <button className="btn btn-outline-secondary">
                  Mange Theft Cases
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </>
    );
};

export default TheftCount;
