import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,registerables } from "chart.js";
import { Grid } from "@mui/material";
import axios from "axios";
function Stats() {
  
  const [count,setCount]=useState([0,0,0,0,0]);
  const [avg,setAverage]=useState([0,0,0,0,0]);

  const getAverage=async()=>{
    axios
      .get("https://tasty-gold-turtleneck.cyclic.app/admin/average", {
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setAverage(response.data.avg);
        }
      });
  }
  const getCount = async () => {
    axios
      .get("https://tasty-gold-turtleneck.cyclic.app/admin/count", {
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setCount(response.data.c);
        }
      });
  };

  useEffect(()=>{
    getCount();
    getAverage()
  },[])


  ChartJS.register(ArcElement,CategoryScale, Tooltip, Legend,...registerables);
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Time taken for each Round(In Minutes)",
      },
    },
  };

  const data = {
    labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"],
    datasets: [
      {
        hoverOffset: 4,
        backgroundColor: ["red","blue","green","yellow","purple"],
        label: "Average Time",
        data:avg,
      },
    ],
  };

  const baroptions = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Users who have completed each round",
      },
    },
  };

  const bardata={
    labels:["Round 1","Round 2","Round 3","Round 4","Round 5"],
    datasets:[
      {
        label:"No. of Users",
        backgroundColor:"lightgreen",
        data:count
      }
    ]
  }
  return (
    <>
    <h1 style={{color:"black"}}>Statistics</h1>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={5}>
          <div>
            <Pie options={options} data={data} />
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <div>
            <Bar options={baroptions} data={bardata} />
          </div>
        </Grid>
        <div></div>
      </Grid>
    </>
  );
}

export default Stats;
