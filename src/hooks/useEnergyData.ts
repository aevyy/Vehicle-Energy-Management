// src/hooks/useEnergyData.ts
import { useState, useEffect } from 'react';
import { EnergyConsumption } from '../models/VehicleModel';

export const useEnergyData = () => {
  const [energyData, setEnergyData] = useState<EnergyConsumption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with artificial delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: EnergyConsumption[] = Array.from({ length: 7 }, (_, index) => ({
          timestamp: new Date(Date.now() - index * 24 * 60 * 60 * 1000), // Last 7 days
          consumption: Number((10 + Math.random() * 5).toFixed(1)), // Random consumption between 10-15 kWh
          distance: Math.round(150 + Math.random() * 100), // Random distance between 150-250 km
          speed: Math.round(70 + Math.random() * 30), // Random speed between 70-100 km/h
          temperature: Math.round(20 + Math.random() * 10) // Random temperature between 20-30°C
        }));

        // Sort by timestamp descending (most recent first)
        mockData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setEnergyData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch energy data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    energyData,
    isLoading,
    error
  };
};