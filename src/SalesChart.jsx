// SalesChart.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartCard = ({ title, series, colors }) => {
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1500,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: true, speed: 400 },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "80%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [title],
      labels: { style: { fontSize: "14px", colors: ["#555"] } },
    },
    yaxis: {
      labels: { show: false },
      max: series.reduce((acc, curr) => acc + curr.data[0], 0) * 1.15,
    },
    tooltip: {
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    colors: colors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        opacityFrom: 0.85,
        opacityTo: 0.15,
        stops: [0, 90, 100],
      },
    },
    grid: { show: false },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <ReactApexChart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

const SalesChart = ({ ingresoBase, incremento }) => {
  const ingresoConApp = ingresoBase + incremento.total;
  const incrementoMarketing = ingresoConApp * 0.25;
  const ingresoPremium = ingresoConApp + incrementoMarketing;

  const chart1 = [
    { name: "Ingreso base", data: [ingresoBase] }
  ];

  const chart2 = [
    { name: "Ingreso base", data: [ingresoBase] },
    { name: "No-shows", data: [incremento.noShows] },
    { name: "Reagendamiento", data: [incremento.rebooking] },
    { name: "Productividad", data: [incremento.productivity] }
  ];

  const chart3 = [
    { name: "Con App", data: [ingresoConApp] },
    { name: "Marketing Premium", data: [incrementoMarketing] }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard title="Ingreso base" series={chart1} colors={["#007bff"]} />
        <ChartCard title="Con App" series={chart2} colors={["#007bff", "#00BCD4", "#FFC107", "#FF5722"]} />
        <ChartCard title="Plan Premium" series={chart3} colors={["#4CAF50", "#9C27B0"]} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-[#007bff] text-center">Resumen financiero</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Ingreso anual base:</strong> ${ingresoBase.toLocaleString()}</li>
            <li><strong>Incremento por No-shows evitados:</strong> ${incremento.noShows.toLocaleString()}</li>
            <li><strong>Incremento por Reagendamiento:</strong> ${incremento.rebooking.toLocaleString()}</li>
            <li><strong>Incremento por Productividad:</strong> ${incremento.productivity.toLocaleString()}</li>
            <li><strong>Incremento adicional por Marketing Premium:</strong> ${incrementoMarketing.toLocaleString()}</li>
            <li><strong>Total estimado con Plan Premium:</strong> ${(ingresoBase + incremento.total + incrementoMarketing).toLocaleString()}</li>
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
