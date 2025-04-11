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
        speed: 1500,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    colors: ["#FF9800", "#4CAF50"],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "55%",
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
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "14px" },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    fill: {
      opacity: 0.9,
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0.4,
        opacityFrom: 0.85,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <ReactApexChart options={options} series={series} type="bar" height={420} />
    </div>
  );
};

export default SalesChart;
