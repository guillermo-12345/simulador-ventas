// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ingresoBase, incremento }) => {
  const incrementoAppTotal = incremento.noShows + incremento.rebooking + incremento.productivity;
  const ingresoConApp = ingresoBase + incrementoAppTotal;
  const incrementoMarketing = ingresoConApp * 0.25;
  const ingresoPremium = ingresoBase + incrementoAppTotal + incrementoMarketing;
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
      data: [0, 0, incrementoMarketing],
    }
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
          position: 'center'
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex, dataPointIndex, w }) => {
        if (seriesIndex === 0) {
          const total = w.globals.stackedSeriesTotals[dataPointIndex];
          return `$${total.toLocaleString()}`;
        }
        return `$${val.toLocaleString()}`;
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ["#fff"]
      }
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
      show: false
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
      <ReactApexChart options={options} series={series} type="bar" height={820} />

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full border text-sm text-center rounded-lg">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="py-3 px-4">Métrica</th>
              <th className="py-3 px-4">% Incremento</th>
              <th className="py-3 px-4">Monto</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold text-purple-700">Ingreso Base</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">${ingresoBase.toLocaleString()}</td>
            </tr>
            <tr className="bg-pink-100 border-b">
              <td className="py-2 px-4 font-semibold">Incremento por funcionalidades de la App</td>
              <td className="py-2 px-4">{((incrementoAppTotal / ingresoBase) * 100).toFixed(1)}%</td>
              <td className="py-2 px-4">+${incrementoAppTotal.toLocaleString()}</td>
            </tr>
            <tr className="bg-pink-200 border-b">
              <td className="py-2 px-4 font-semibold">Incremento por Marketing Premium</td>
              <td className="py-2 px-4">25%</td>
              <td className="py-2 px-4">+${incrementoMarketing.toLocaleString()}</td>
            </tr>
            <tr className="bg-green-100 font-bold">
              <td className="py-2 px-4">Total estimado con Premium</td>
              <td className="py-2 px-4">{(((ingresoPremium - ingresoBase) / ingresoBase) * 100).toFixed(1)}%</td>
              <td className="py-2 px-4">${ingresoPremium.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesChart;
