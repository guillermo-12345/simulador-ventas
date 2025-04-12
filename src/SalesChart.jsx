// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ingresoBase, incremento }) => {
  const ingresoConApp = ingresoBase + incremento.total;
  const incrementoMarketing = ingresoConApp * 0.25;
  const ingresoPremium = ingresoConApp + incrementoMarketing;
  const maxY = ingresoPremium * 1.2;

  const series = [
    {
      name: "Ingreso base",
      data: [ingresoBase, ingresoBase, ingresoBase],
    },
    {
      name: "Incremento App",
      data: [0, incremento.noShows + incremento.rebooking + incremento.productivity, 0],
    },
    {
      name: "Marketing Premium",
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
        columnWidth: "60%",
        dataLabels: {
          position: 'center',
          total: {
            enabled: true,
            style: {
              fontSize: '14px',
              fontWeight: 600,
            }
          }
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val.toLocaleString()}`,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ["#fff"]
      }
    },
    xaxis: {
      categories: ["Ingreso base", "Con App", "Plan Premium"],
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
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-[#007bff] text-center">Resumen financiero</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Ingreso anual base:</strong> ${ingresoBase.toLocaleString()}</li>
            <li><strong>Incremento total por funcionalidades de la App:</strong> ${(incremento.noShows + incremento.rebooking + incremento.productivity).toLocaleString()}</li>
            <li><strong>Incremento adicional por Marketing Premium:</strong> ${incrementoMarketing.toLocaleString()}</li>
            <li><strong>Total estimado con Plan Premium:</strong> ${ingresoPremium.toLocaleString()}</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-[#4CAF50] text-center">Impacto con MioSalon</h3>
          <ul className="list-decimal list-inside space-y-2">
            <li>Reducción de ausencias con recordatorios automáticos</li>
            <li>Reagendamiento inteligente de clientes perdidos</li>
            <li>Aumento de productividad con mejores flujos de trabajo</li>
            <li>Promociones efectivas con marketing automatizado</li>
            <li>Incremento del ticket medio por cliente</li>
            <li>Más citas agendadas sin esfuerzo manual</li>
            <li>Decisiones basadas en datos reales del negocio</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
