// src/components/BatteryMonitor.tsx
import React from 'react';
import { Vehicle } from '../models/VehicleModel';

interface BatteryMonitorProps {
  vehicle: Vehicle;
}

const BatteryMonitor: React.FC<BatteryMonitorProps> = ({ vehicle }) => {
  // Calculate the battery fill percentage based on current charge and capacity
  const fillPercentage = Math.min(100, (vehicle.currentCharge / vehicle.batteryCapacity) * 100);

  return (
    <div className="battery-monitor">
      <h2>Battery Monitor</h2>
      <div
        className="battery-icon"
        style={{
          position: 'relative',
          width: '200px',
          height: '40px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          margin: '20px auto'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${fillPercentage}%`,
            background: '#ccc',
            borderRadius: '3px 0 0 3px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#222',
            fontWeight: 'bold'
          }}
        >
          {fillPercentage.toFixed(0)}%
        </div>
      </div>
      <p>Current Charge: {vehicle.currentCharge} kWh / {vehicle.batteryCapacity} kWh</p>
    </div>
  );
};

export default BatteryMonitor;