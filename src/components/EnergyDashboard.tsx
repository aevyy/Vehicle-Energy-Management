// src/components/EnergyDashboard.tsx
import React from 'react';
import { Vehicle } from '../models/VehicleModel';

interface EnergyDashboardProps {
  vehicle: Vehicle;
}

const EnergyDashboard: React.FC<EnergyDashboardProps> = ({ vehicle }) => {
  return (
    <div className="energy-dashboard">
      <h2>Energy</h2>
      <p style={{ fontSize: '1.2em', lineHeight: '1.4', margin: '5px 0' }}>
        Current: {vehicle.currentCharge.toFixed(1)} kWh
      </p>
      <p style={{ fontSize: '1.2em', lineHeight: '1.4', margin: '5px 0' }}>
        Capacity: {vehicle.batteryCapacity.toFixed(1)} kWh
      </p>
      <p style={{ fontSize: '1.2em', lineHeight: '1.4', margin: '5px 0' }}>
        Avg Consumption: {vehicle.averageConsumption.toFixed(1)} kWh/100km
      </p>
    </div>
  );
};

export default EnergyDashboard;