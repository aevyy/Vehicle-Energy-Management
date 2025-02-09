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
      <h2>Battery</h2>
      <div
        className="battery-icon"
        style={{
          position: 'relative',
          width: '200px',
          height: '40px',
          border: '3px solid #ccc',
          borderRadius: '8px',
          margin: '20px auto'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: '3px',
            height: 'calc(100% - 6px)',
            width: `calc(${fillPercentage}% - 6px)`,
            background: '#ccc',
            borderRadius: '5px 0 0 5px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#222',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}
        >
          {fillPercentage.toFixed(0)}%
        </div>
      </div>
      <p style={{ fontSize: '1.2em', lineHeight: '1.4', margin: '5px 0' }}>
        {vehicle.currentCharge.toFixed(1)} / {vehicle.batteryCapacity.toFixed(1)} kWh
      </p>
    </div>
  );
};

export default BatteryMonitor;