// SalesChart.jsx
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ ticketPromedio, citasPorMes }) => {
  

  const ingresoBase = ticketPromedio * citasPorMes * 12;

  const incremento = {
    noShows: ingresoBase * 0.25,
    rebooking: ingresoBase * 0.15,
    productivity: ingresoBase * 0.2,
  };

  const incrementoAppTotal = incremento.noShows + incremento.rebooking + incremento.productivity;
  const ingresoConApp = ingresoBase + incrementoAppTotal;

  const incrementoMarketing = ingresoConApp * 0.27;
  const incrementoTicketPromedio = ingresoConApp * 0.1;

  const ingresoPremium = ingresoConApp + incrementoMarketing + incrementoTicketPromedio;
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
      formatter: (val) => `$${val.toLocaleString()}`,
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
              <td className="py-4 px-6 font-semibold">Incremento con MioSalon</td>
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
  
      {/* Tabla adicional: mecanismos MioSalon */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 text-[#4CAF50] text-center">¿Cómo logramos este impacto?</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4">Mecanismo</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4">Cómo impacta</th>
                <th className="py-3 px-4">Impacto típico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="bg-gray-50">
                <td className="py-3 px-4">Upselling en reservas</td>
                <td className="py-3 px-4">Clientes ven opciones de agregar servicios</td>
                <td className="py-3 px-4">Incentiva servicios premium</td>
                <td className="py-3 px-4">+5–15%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Paquetes y combos</td>
                <td className="py-3 px-4">Creación de combos o experiencias</td>
                <td className="py-3 px-4">Aumenta valor del ticket</td>
                <td className="py-3 px-4">+10–20%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4">Promociones personalizadas</td>
                <td className="py-3 px-4">SMS/email según historial</td>
                <td className="py-3 px-4">Pone servicios correctos al cliente correcto</td>
                <td className="py-3 px-4">+5–10%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Recomendaciones post-visita</td>
                <td className="py-3 px-4">Mensajes con productos personalizados</td>
                <td className="py-3 px-4">Impulsa productos adicionales</td>
                <td className="py-3 px-4">+3–7%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4">Visibilidad del staff</td>
                <td className="py-3 px-4">Saber quién vende más</td>
                <td className="py-3 px-4">Fomenta competencia y logros</td>
                <td className="py-3 px-4">+3–8%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Inventario en tiempo real</td>
                <td className="py-3 px-4">No perder oportunidades por faltantes</td>
                <td className="py-3 px-4">Captura todas las ventas</td>
                <td className="py-3 px-4">+2–5%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4">Notas y preferencias</td>
                <td className="py-3 px-4">Se recuerdan hábitos y gustos</td>
                <td className="py-3 px-4">Upsell relevante y contextual</td>
                <td className="py-3 px-4">+2–5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}  
export default SalesChart;
