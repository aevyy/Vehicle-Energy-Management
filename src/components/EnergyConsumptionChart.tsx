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
    <div className="energy-consumption-chart">
      <h2>Consumption</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="#ccc" fontSize="0.8em" />
          <YAxis stroke="#ccc" fontSize="0.8em" />
          <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#ccc', fontSize: '0.8em' }} itemStyle={{ color: '#ccc' }} cursor={{ stroke: '#ccc', strokeWidth: 1 }} />
          <Legend wrapperStyle={{ color: '#ccc', fontSize: '0.8em' }} />
          <Line type="monotone" dataKey="consumption" stroke="#ccc" strokeWidth={1} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyConsumptionChart; 