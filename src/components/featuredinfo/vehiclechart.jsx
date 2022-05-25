import React,{useEffect, useState} from 'react'


import {Bar} from 'react-chartjs-2';

// import api handler
import axios from 'axios';

import styled from 'styled-components';


const Barchart=styled.div` 
margin-left:10px;
width:600px;
background-color: #FFFFFF; 

`;

const Title=styled.h1`
font-size=14px;
margin-left:10px;
`;

const Wrapper=styled.div`
background-color: #FFFFFF; 
margin-top:80px;
margin-left:60px;

`;


export default function Vehiclechart() {
    const [fetch, setFetch] = useState(false);
    const [vehicleData,setVehicleData] = useState([]);

    useEffect(()=>{
        setFetch(true);
    },[])


    const getVehicleData = () =>{
        axios.get(`/api/get-vehicle-data`).then((res) =>{
            if(res.data["status"]===200){
                setVehicleData(res.data);
                
            }

        })
    }


    if(fetch){
        getVehicleData();
        setFetch(false);
    }


    return (
        <>


<Wrapper>
      <Title>
        Number of vehicles by type
        </Title>
    <Barchart>
      
    <Bar data={{
        labels:['TwoWheelers','ThreeWheelers','FourWheelers','Public Transport','HeavyDieselVehicles','LightCommercialVehicles'],
        datasets : [
          {
            label:'# of Vehicles',
            data:[vehicleData['TwoWheels'],vehicleData['ThreeWheels'],vehicleData['FourWheels'],vehicleData['HDV'],vehicleData['LCV'],vehicleData['PublicTransport']],
            backgroundColor: [
     'rgba(255, 99, 132, 0.8)',
     'rgba(255, 159, 64, 0.8)',
     'rgba(255, 205, 86, 0.8)',
     'rgba(75, 192, 192, 0.8)',
     'rgba(54, 162, 235, 0.8)'
   ],
   borderColor: [
     'rgb(255, 99, 132)',
     'rgb(255, 159, 64)',
     'rgb(255, 205, 86)',
     'rgb(75, 192, 192)',
     'rgb(54, 162, 235)'
   ],
          },
        ],

      }}
      width={10}
      height={300}
      options={
          
        {maintainAspectRatio:false,
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: function(value) {if (value % 1 === 0) {return value;}}
                  }
                }]
              }
        
        
        }
        
    
    
    
    
      }
    />
</Barchart>

</Wrapper>

        </>
    )
}
