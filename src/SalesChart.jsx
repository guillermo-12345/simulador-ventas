// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ticketPromedio, citasPorMes }) => {
  const ingresoBase = ticketPromedio * citasPorMes * 12;

  const incremento = {
    noShows: ingresoBase * 0.25,
    rebooking: ingresoBase * 0.15,
    productivity: ingresoBase * 0.2,
  };

  const incrementoAppTotal =
    incremento.noShows + incremento.rebooking + incremento.productivity;
  const ingresoConApp = ingresoBase + incrementoAppTotal;

  const incrementoMarketing = ingresoConApp * 0.27;
  const incrementoTicketPromedio = ingresoConApp * 0.1;

  const ingresoPremium =
    ingresoConApp + incrementoMarketing + incrementoTicketPromedio;
  const maxY = ingresoPremium * 1.2;

  const series = [
    {
      name: "Sin MioSalon",
      data: [ingresoBase, ingresoBase, ingresoBase],
    },
    {
      name: "Con MioSalon",
      data: [0, incrementoAppTotal, incrementoAppTotal],
    },
    {
      name: "Con MioSalon Premium",
      data: [0, 0, incrementoMarketing + incrementoTicketPromedio],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      height: 800,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 2000,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: true, speed: 400 },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "75%",
        dataLabels: {
          position: "center",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val.toLocaleString()}`,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: ["Sin MioSalon", "Con MioSalon", "Con MioSalon Premium"],
      labels: { style: { fontSize: "14px", colors: ["#555"] } },
    },
    yaxis: {
      labels: { show: false },
      max: maxY,
    },
    tooltip: {
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    legend: {
      show: false,
    },
    colors: ["#1E90FF", "#FF7F50", "#9C27B0"],
    fill: {
      type: "solid",
    },
    grid: {
      show: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#4CAF50]">
        Simulación de Ingreso Anual con MioSalon
      </h2>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={820}
      />

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full border text-sm text-center rounded-lg">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="py-4 px-6">Métrica</th>
              <th className="py-4 px-6">% Incremento</th>
              <th className="py-4 px-6">Monto</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-[#F3E8FF]">
              <td className="py-4 px-6 font-semibold text-purple-700">Ingreso Base</td>
              <td className="py-4 px-6">-</td>
              <td className="py-4 px-6">${ingresoBase.toLocaleString()}</td>
            </tr>
            <tr className="bg-[#FFF1F2]">
              <td className="py-4 px-6 font-semibold">Incremento por funcionalidades de la App</td>
              <td className="py-4 px-6">60%</td>
              <td className="py-4 px-6">+${incrementoAppTotal.toLocaleString()}</td>
            </tr>
            <tr className="bg-[#FDF6F0]">
              <td className="py-4 px-6 font-semibold">Total estimado con MioSalon</td>
              <td className="py-4 px-6">
                {(((ingresoConApp - ingresoBase) / ingresoBase) * 100).toFixed(1)}%
              </td>
              <td className="py-4 px-6">${ingresoConApp.toLocaleString()}</td>
            </tr>
            <tr className="bg-[#EDE7F6]">
              <td className="py-4 px-6 font-semibold">Incremento por Marketing Premium</td>
              <td className="py-4 px-6">27%</td>
              <td className="py-4 px-6">+${incrementoMarketing.toLocaleString()}</td>
            </tr>
            <tr className="bg-[#E8F5E9]">
              <td className="py-4 px-6 font-semibold">Incremento por Ticket Promedio</td>
              <td className="py-4 px-6">10%</td>
              <td className="py-4 px-6">+${incrementoTicketPromedio.toLocaleString()}</td>
            </tr>
            <tr className="bg-[#DCEDC8] text-green-900 font-bold">
              <td className="py-4 px-6">Total estimado con Premium</td>
              <td className="py-4 px-6">
                {(((ingresoPremium - ingresoBase) / ingresoBase) * 100).toFixed(1)}%
              </td>
              <td className="py-4 px-6">${ingresoPremium.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesChart;
