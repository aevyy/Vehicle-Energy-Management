import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Vehicle } from '../models/VehicleModel';

interface EnergyConsumptionChartProps {
  vehicle: Vehicle;
}

const EnergyConsumptionChart: React.FC<EnergyConsumptionChartProps> = ({ vehicle }) => {
  // Generate sample energy consumption data based on vehicle's average consumption
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    consumption: vehicle.averageConsumption * (0.8 + Math.random() * 0.4)
  }));

  return (
    <div className="energy-consumption-chart" style={{ margin: '20px auto', width: '90%', maxWidth: '800px' }}>
      <h2>Energy Consumption Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#ccc' }} itemStyle={{ color: '#ccc' }} cursor={{ stroke: '#ccc', strokeWidth: 2 }} />
          <Legend wrapperStyle={{ color: '#ccc' }} />
          <Line type="monotone" dataKey="consumption" stroke="#ccc" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyConsumptionChart; 