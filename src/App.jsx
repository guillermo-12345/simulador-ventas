// App.jsx
import React, { useState } from "react";
import SalesChart from "./SalesChart";
import logo from "./assets/logo.png";

const App = () => {
  const [empleados, setEmpleados] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [incremento, setIncremento] = useState("");
  const [data, setData] = useState([]);
  const [resumen, setResumen] = useState(null);

  const calcularDatos = () => {
    const base = empleados * ingreso;
    const crecimientoNormal = 0.05;
    const crecimientoApp = (Number(incremento) / 100) || 0.2;

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let totalNormal = 0;
    let totalApp = 0;

    const newData = meses.map((mes, i) => {
      const ingresoNormal = base * Math.pow(1 + crecimientoNormal / 12, i);
      const ingresoApp = base * Math.pow(1 + crecimientoApp / 12, i);

      totalNormal += ingresoNormal;
      totalApp += ingresoApp;

      return {
        mes,
        "Ventas normales": Math.round(ingresoNormal),
        "Ventas con nuestra app": Math.round(ingresoApp),
      };
    });

    setData(newData);
    const diferencia = totalApp - totalNormal;
    const porcentaje = (diferencia / totalNormal) * 100;

    setResumen({
      totalNormal: Math.round(totalNormal),
      totalApp: Math.round(totalApp),
      diferencia: Math.round(diferencia),
      porcentaje: porcentaje.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <img src={logo} alt="MioSalon logo" className="w-36 sm:w-40" />
        <h1 className="text-3xl font-bold text-gray-700 text-center sm:text-left">
          Simulador de Incremento de Ventas
        </h1>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-6 border border-gray-200">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Cantidad de empleados:</span>
            <input
              type="number"
              value={empleados}
              onChange={(e) => setEmpleados(Number(e.target.value))}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Ingreso promedio por cliente:</span>
            <input
              type="number"
              value={ingreso}
              onChange={(e) => setIngreso(Number(e.target.value))}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Incremento estimado con nuestra app (%):</span>
            <input
              type="number"
              value={incremento}
              onChange={(e) => setIncremento(e.target.value)}
              placeholder="Ej: 20"
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <button
            onClick={calcularDatos}
            className="bg-[#00BCD4] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#00a7bc] transition"
          >
            Calcular
          </button>
        </div>
      </div>

      {data.length > 0 && <SalesChart data={data} />}

      {resumen && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📊 Resumen de Resultados Anuales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
            <div className="p-4 rounded-lg bg-[#FF9800]/10 border-l-4 border-[#FF9800]">
              <strong className="block text-[#FF9800]">Ventas normales:</strong>
              ${resumen.totalNormal.toLocaleString()}
            </div>
            <div className="p-4 rounded-lg bg-[#4CAF50]/10 border-l-4 border-[#4CAF50]">
              <strong className="block text-[#4CAF50]">Ventas con nuestra app:</strong>
              ${resumen.totalApp.toLocaleString()}
            </div>
            <div className="p-4 rounded-lg bg-[#F44336]/10 border-l-4 border-[#F44336]">
              <strong className="block text-[#F44336]">Diferencia:</strong>
              +${resumen.diferencia.toLocaleString()}
            </div>
            <div className="p-4 rounded-lg bg-[#00BCD4]/10 border-l-4 border-[#00BCD4]">
              <strong className="block text-[#00BCD4]">Incremento total:</strong>
              {resumen.porcentaje}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
