// src/services/EnergyOptimizationService.ts
import { Vehicle, EnergyConsumption, EnvironmentalFactors } from '../models/VehicleModel';

export class EnergyOptimizationService {
  static calculateOptimalChargingTime(
    vehicle: Vehicle, 
    electricityRates: number[], 
    currentTime: Date
  ): { optimalTimeSlot: number; savingsPercentage: number } {
    if (electricityRates.length === 0) {
      throw new Error("Electricity rates array cannot be empty.");
    }

    const lowestRateIndex = electricityRates.indexOf(Math.min(...electricityRates));
    const averageRate = electricityRates.reduce((a, b) => a + b, 0) / electricityRates.length;
    const savingsPercentage = ((averageRate - electricityRates[lowestRateIndex]) / averageRate) * 100;

    return {
      optimalTimeSlot: lowestRateIndex,
      savingsPercentage: savingsPercentage
    };
  }

  static predictBatteryDegradation(
    vehicle: Vehicle, 
    consumptionHistory: EnergyConsumption[], 
    environmentalFactors: EnvironmentalFactors[]
  ): { currentCapacity: number; projectedDegradation: number } {
    if (consumptionHistory.length !== environmentalFactors.length) {
      throw new Error("Consumption history and environmental factors must have the same length.");
    }

    const cycleFactor = consumptionHistory.length;
    const temperatureFactor = environmentalFactors.reduce((sum, env) => 
      sum + Math.abs(env.temperature - 20), 0) / environmentalFactors.length;
    
    const baseDegradationRate = vehicle.batteryType === 'Li-Ion' ? 0.1 : 
      vehicle.batteryType === 'Solid-State' ? 0.05 : 0.08;

    const adjustedDegradationRate = baseDegradationRate * 
      (1 + (temperatureFactor / 10)) * 
      (cycleFactor / 1000);

    const currentCapacity = vehicle.batteryCapacity * (1 - adjustedDegradationRate);

    return {
      currentCapacity,
      projectedDegradation: adjustedDegradationRate * 100
    };
  }

  static calculateEnergyEfficiency(
    energyConsumptions: EnergyConsumption[], 
    environmentalFactors: EnvironmentalFactors[]
  ): { averageEfficiency: number; efficiencyTrend: number[] } {
    if (energyConsumptions.length !== environmentalFactors.length) {
      throw new Error("Energy consumptions and environmental factors must have the same length.");
    }

    const efficiencies = energyConsumptions.map((consumption, index) => {
      const env = environmentalFactors[index];
      const baseEfficiency = consumption.distance / consumption.consumption;
      
      // Adjust efficiency based on environmental factors
      const temperatureAdjustment = env.temperature > 25 ? 0.9 : 
                                     env.temperature < 10 ? 0.8 : 1;
      const roadTypeAdjustment = env.roadType === 'highway' ? 1.1 : 
                                  env.roadType === 'mountain' ? 0.7 : 1;

      return baseEfficiency * temperatureAdjustment * roadTypeAdjustment;
    });

    return {
      averageEfficiency: efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length,
      efficiencyTrend: efficiencies
    };
  }

  static calculateRange(vehicle: Vehicle): number {
    if (vehicle.averageConsumption <= 0) {
      throw new Error("Average consumption must be greater than 0.");
    }

    const range = (vehicle.batteryCapacity * (vehicle.currentCharge / 100)) / vehicle.averageConsumption;
    return range;
  }
}