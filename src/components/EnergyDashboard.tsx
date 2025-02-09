// src/components/EnergyDashboard.tsx
import React from 'react';
import { Vehicle } from '../models/VehicleModel';

interface EnergyDashboardProps {
  vehicle: Vehicle;
}

const EnergyDashboard: React.FC<EnergyDashboardProps> = ({ vehicle }) => {
  return (
    <div className="energy-dashboard">
      <h2>Energy Dashboard</h2>
      <p>Current Charge: {vehicle.currentCharge} kWh</p>
      <p>Battery Capacity: {vehicle.batteryCapacity} kWh</p>
      <p>Average Consumption: {vehicle.averageConsumption} kWh/100km</p>
    </div>
  );
};

export default EnergyDashboard;