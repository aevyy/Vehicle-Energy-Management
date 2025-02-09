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
      {/* Display the vehicle's current charge */}
      <p>Current Charge: {vehicle.currentCharge} kWh</p>
      {/* Display the vehicle's battery capacity */}
      <p>Battery Capacity: {vehicle.batteryCapacity} kWh</p>
      {/* Display the vehicle's average energy consumption */}
      <p>Average Consumption: {vehicle.averageConsumption} kWh/100km</p>
    </div>
  );
};

export default EnergyDashboard;