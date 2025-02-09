// tests/energy_optimization_tests.ts
import { EnergyOptimizationService } from '../src/services/EnergyOptimizationService';
import { Vehicle, EnergyConsumption, EnvironmentalFactors } from '../src/models/VehicleModel';

const mockVehicle: Vehicle = {
  id: 'test',
  make: 'TestCar',
  model: 'EV1',
  year: 2023,
  batteryCapacity: 100,
  currentCharge: 50,
  averageConsumption: 20,
  batteryType: 'Li-Ion',
  chargingEfficiency: 90
};

const mockConsumptions: EnergyConsumption[] = [
  {
    timestamp: new Date(),
    consumption: 15,
    distance: 200,
    speed: 100,
    temperature: 22
  }
];

const mockEnvironment: EnvironmentalFactors[] = [
  {
    temperature: 22,
    humidity: 60,
    altitude: 100,
    roadType: 'highway'
  }
];

describe('EnergyOptimizationService', () => {
  test('calculates optimal charging time', () => {
    const rates = [0.15, 0.12, 0.10];
    const result = EnergyOptimizationService.calculateOptimalChargingTime(mockVehicle, rates, new Date());
    
    expect(result.optimalTimeSlot).toBe(2);
    expect(result.savingsPercentage).toBeGreaterThan(0);
  });

  test('predicts battery degradation', () => {
    const degradationResult = EnergyOptimizationService.predictBatteryDegradation(
      mockVehicle, 
      mockConsumptions, 
      mockEnvironment
    );

    expect(degradationResult.currentCapacity).toBeLessThan(mockVehicle.batteryCapacity);
    expect(degradationResult.projecteDegradation).toBeGreaterThan(0);
  });
});