import React, { useEffect, useState } from "react";
import "./graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Lottie from "react-lottie";
import { Line } from "react-chartjs-2";
import * as animationData from "./125182-loading.json";
import getLastSevenDaysofData from "./filterMethods/getLastSevenDaysofData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 *
 * @param {boolean} props.responsive - Boolean - If the graph should be responsive
 * @param {(top | bottom | left | right)} props.legendPosition - (top | bottom | left | right) - The position of the legend
 * @param props.title - String - The title of the graph
 * @param props.labels - String - The X axis labels
 * @param props.dataset - Array - The array of assessments
 * @param props.filterFunction - Function that filters the assessments and returns a configured dataset.
 * @returns Line Chart Component
 */
const LineChart = (props: any) => {
  const [fomattedData, setfomattedData] = useState<any>();
  const [loading, setLoading] = useState(true);

  //Get Data
  useEffect(() => {
    setfomattedData(
      getLastSevenDaysofData(props.dataset, setLoading, props.dataTitle))
  }, [props.dataset]);

  const options = {
    responsive: props.responsive || true,
    plugins: {
      legend: {
        position: props.legendPosition || ("top" as const),
      },
      title: {
        display: props.title ? true : false,
        text: props.title,
      },
    },
    scales: {
      yAxis: {
        min: 0
      }
    }
  };

  const labels = props.labels;
  console.log(fomattedData)
  const data = fomattedData || {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [1, 2, 3, 4, 5],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="graph-container">
      {loading ? (
        <div className="loading">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={200}
          ></Lottie>
        </div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default LineChart;
