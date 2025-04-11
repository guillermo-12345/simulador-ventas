// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ data }) => {
  const categories = data.map((item) => item.mes);
  const normales = data.map((item) => item["Ventas normales"]);
  const app = data.map((item) => item["Ventas con nuestra app"]);

  const series = [
    {
      name: "Ventas normales",
      data: normales,
    },
    {
      name: "Con nuestra app",
      data: app,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1800,
        animateGradually: { enabled: true, delay: 200 },
        dynamicAnimation: { enabled: true, speed: 500 },
      },
      background: "transparent",
    },
    colors: ["#007bff", "#4CAF50"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
        endingShape: "rounded",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "16px",
      markers: {
        radius: 12,
      },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      labels: { style: { fontSize: "14px", colors: "#555" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "14px", colors: "#555" },
      },
    },
    tooltip: {
      theme: "light",
      style: { fontSize: "14px" },
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        opacityFrom: 0.9,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#eee",
      strokeDashArray: 5,
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <ReactApexChart options={options} series={series} type="bar" height={420} />
    </div>
  );
};

export default SalesChart;
