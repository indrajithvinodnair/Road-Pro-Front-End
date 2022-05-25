import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

// import api handler
import axios from "axios";

import styled from "styled-components";
import Featuredinfo from "../../components/featuredinfo/featuredinfo";
import Vehiclechart from "../../components/featuredinfo/vehiclechart";
import Applicationstats from "../../components/featuredinfo/Applicationstats";
// const barchart = {
//   marginLeft:"10px";
//   display: "flex",
//   paddingLeft: "10px",
// };

const Barchart = styled.div`
  margin-left: 10px;
  width: 600px;
  background-color: #ffffff;
`;

const Title = styled.h1`
font-size=14px;
margin-left:10px;
`;
const Doughnutchart = styled.div`
  margin-top: -355px;
  height: 80px;
  width: 600px;
  margin-left: 600px;
`;

const Wrapper = styled.div`
  background-color: #ffffff;
  margin-top: 80px;
  margin-left: 60px;
`;

const WrapperSection2 = styled.div`
  margin-top: 350px;
`;

const DashPage = () => {
  const [fetch, setFetch] = useState(false);
  const [countData, setCountData] = useState([]);
  const [licenseData, setLicenData] = useState([]);

  useEffect(() => {
    setFetch(true);
  }, []);

  const getCount = () => {
    axios.get(`/api/get-user-count`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setCountData(res.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getLicenseStats = () => {
    axios.get(`/api/get-license-stats`).then(
      (res) => {
        if (res.data["status"] === 200) {
          setLicenData(res.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (fetch) {
    getCount();
    getLicenseStats();
    setFetch(false);
  }

  return (
    <>
      <Featuredinfo />
      <Wrapper>
        <Title>Number of users by type</Title>
        <Barchart>
          <Bar
            data={{
              labels: ["Civilians", "RTOs", "Civil Police", "Traffic Police"],
              datasets: [
                {
                  label: "# of Users",
                  data: [
                    countData["civilians"],
                    countData["rto"],
                    countData["civil"],
                    countData["traffic"],
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                  ],
                },
              ],
            }}
            width={10}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        </Barchart>

        <Doughnutchart>
          <Title>Number of Licenses </Title>
          <Doughnut
            data={{
              labels: ["Active", "Suspended"],
              datasets: [
                {
                  label: "# of licences",
                  data: [licenseData["active"], licenseData["suspended"]],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                  ],
                  borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
                },
              ],
            }}
            options={({ radius: 50 }, { aspectRatio: 2 })}
          />
        </Doughnutchart>
      </Wrapper>
      <WrapperSection2>
        <Vehiclechart />
        <Applicationstats />
      </WrapperSection2>
    </>
  );
};

export default DashPage;