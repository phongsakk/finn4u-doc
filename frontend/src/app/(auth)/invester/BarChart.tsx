"use client"
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart: React.FC = () => {
  const data: ChartData<"bar"> = {
    labels: ["FInn4U \n(ดอกเบี้ย 9-13%)", "นอกละบบ \n(ดอกเบี้ย <15%)"],
    datasets: [
      {
        data: [130500, 217500],
        backgroundColor: ["rgba(48, 177, 117, 1)", "rgba(164, 164, 164, 1)"],
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
      datalabels: {
        display: true,
        color: "black",
        font: {
          weight: "bold",
        },
        anchor: "end",
        align: "top",
        formatter: (value: number) => value.toLocaleString(),
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
