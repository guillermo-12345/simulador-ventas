// App.jsx
import React, { useState } from "react";
import SalesChart from "./SalesChart";
import logo from "./assets/logo.png";

const App = () => {
  const [ticket, setTicket] = useState("");
  const [citas, setCitas] = useState("");
  const [ingresoBase, setIngresoBase] = useState(null);
  const [incremento, setIncremento] = useState(null);

  const calcular = () => {
    const mensual = ticket * citas;
    const anual = mensual * 12;
    setIngresoBase(anual);

    // Incrementos según proporción de la imagen (97% total uplift, sin marketing)
    const uplift = 0.97;
    const contribuciones = {
      noShows: 0.25,
      rebooking: 0.20,
      productivity: 0.30,
      marketing: 0.25,
    };

    const incremento = {
      noShows: anual * uplift * contribuciones.noShows,
      rebooking: anual * uplift * contribuciones.rebooking,
      productivity: anual * uplift * contribuciones.productivity,
      premiumMarketing: anual * uplift * contribuciones.marketing,
    };
    incremento.total = incremento.noShows + incremento.rebooking + incremento.productivity;

    setIncremento(incremento);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <img src={logo} alt="MioSalon logo" className="w-36 sm:w-40" />
        <h1 className="text-3xl font-bold text-[#007bff] text-center sm:text-left">
          Simulador de Impacto Anual
        </h1>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-6 border border-gray-200">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Ticket promedio mensual ($):</span>
            <input
              type="number"
              value={ticket}
              onChange={(e) => setTicket(Number(e.target.value))}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Cantidad de citas por mes:</span>
            <input
              type="number"
              value={citas}
              onChange={(e) => setCitas(Number(e.target.value))}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <button
            onClick={calcular}
            className="bg-[#007bff] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#005ecb] transition"
          >
            Calcular</button>
        </div>
      </div>

      {ingresoBase && incremento && <SalesChart ingresoBase={ingresoBase} incremento={incremento} />}

      {incremento && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-[#007bff] mb-6 text-center">
            📊 Resumen del impacto de MioSalon
          </h2>
          <p className="text-lg text-gray-700 mb-4">El ingreso anual base es de <strong>${ingresoBase.toLocaleString()}</strong>. Gracias a MioSalon, podrías aumentar tus ingresos hasta <strong>${(incremento.total + incremento.premiumMarketing).toLocaleString()}</strong>, distribuidos de la siguiente forma:</p>
          <ul className="space-y-2 text-gray-800 text-base list-disc list-inside">
            <li><strong>No-shows evitados:</strong> ${incremento.noShows.toLocaleString()}</li>
            <li><strong>Reagendamiento inteligente:</strong> ${incremento.rebooking.toLocaleString()}</li>
            <li><strong>Productividad del equipo:</strong> ${incremento.productivity.toLocaleString()}</li>
            <li><strong>Plan Premium (marketing y promociones):</strong> ${incremento.premiumMarketing.toLocaleString()}</li>
          </ul>
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>¿Cómo lo logramos?</strong></p>
            <ul className="list-decimal list-inside mt-2">
              <li>Upselling en el flujo de reserva (+5–15%)</li>
              <li>Creación de paquetes de servicios (+10–20%)</li>
              <li>Promociones personalizadas por SMS/email (+5–10%)</li>
              <li>Recomendaciones post-servicio (+3–7%)</li>
              <li>Visibilidad del rendimiento del staff (+3–8%)</li>
              <li>Inventario en tiempo real (+2–5%)</li>
              <li>Notas de clientes y preferencias (+2–5%)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
