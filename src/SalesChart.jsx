// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ingresoBase, incremento }) => {
  const ingresoConApp = ingresoBase + incremento.total;
  const incrementoMarketing = ingresoConApp * 0.25; // Aplicar marketing sobre el ingreso mejorado
  const ingresoPremium = ingresoConApp + incrementoMarketing;

  const series = [
    {
      name: "Ingreso anual base",
      data: [ingresoBase, 0, 0],
    },
    {
      name: "Con App (No-shows, Rebooking, Productividad)",
      data: [0, ingresoConApp, 0],
    },
    {
      name: "Plan Premium (Marketing)",
      data: [0, 0, ingresoPremium],
    }
  ];

  const options = {
    chart: {
      type: "bar",
      height: 500,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 2000,
        animateGradually: { enabled: true, delay: 300 },
        dynamicAnimation: { enabled: true, speed: 600 },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
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
      fontSize: "14px",
    },
    xaxis: {
      categories: ["Sin App", "Con App", "Con Plan Premium"],
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#555"]
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "14px", colors: "#555" },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    colors: ["#007bff", "#4CAF50", "#9C27B0"],
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shade: "light",
        shadeIntensity: 0.4,
        opacityFrom: 0.9,
        opacityTo: 0.2,
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
          chart: { height: 360 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <ReactApexChart options={options} series={series} type="bar" height={520} />
      <div className="mt-8 text-gray-700 text-base">
        <h3 className="text-xl font-semibold mb-4 text-[#007bff] text-center">Resumen financiero</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Ingreso anual base:</strong> ${ingresoBase.toLocaleString()}</li>
          <li><strong>Ingreso con App (evitando no-shows, rebooking, productividad):</strong> ${ingresoConApp.toLocaleString()}</li>
          <li><strong>Ingreso con Plan Premium (Marketing sobre lo optimizado):</strong> ${ingresoPremium.toLocaleString()}</li>
          <li><strong>Incremento total por funcionalidades básicas:</strong> ${(ingresoConApp - ingresoBase).toLocaleString()}</li>
          <li><strong>Incremento adicional por Marketing Premium:</strong> ${incrementoMarketing.toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default SalesChart;
