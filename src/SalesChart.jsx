// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ingresoBase, incremento }) => {
  const series = [
    {
      name: "Ingreso anual base",
      data: [ingresoBase],
    },
    {
      name: "Ingreso incrementado total",
      data: [ingresoBase + incremento.total],
    },
    {
      name: "No-shows evitados",
      data: [incremento.noShows],
    },
    {
      name: "Reagendamiento",
      data: [incremento.rebooking],
    },
    {
      name: "Productividad",
      data: [incremento.productivity],
    },
    {
      name: "Plan Premium (Marketing)",
      data: [incremento.premiumMarketing],
    }
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1800,
        animateGradually: { enabled: true, delay: 200 },
        dynamicAnimation: { enabled: true, speed: 500 },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Escenario anual"],
      labels: { style: { fontSize: "14px", colors: "#555" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "14px", colors: "#555" },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    colors: [
      "#007bff", // base
      "#4CAF50", // total
      "#00BCD4", // no-shows
      "#FFC107", // rebooking
      "#FF5722", // productividad
      "#9C27B0"  // premium marketing
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        opacityFrom: 0.85,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#eee",
      strokeDashArray: 5,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 320 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <ReactApexChart options={options} series={series} type="bar" height={420} />
    </div>
  );
};

export default SalesChart;
