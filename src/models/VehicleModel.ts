// src/models/VehicleModel.ts
export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    batteryCapacity: number; // kWh
    currentCharge: number; // percentage
    averageConsumption: number; // kWh per 100 km
    batteryType: 'Li-Ion' | 'Solid-State' | 'LFP';
    chargingEfficiency: number; // percentage of energy effectively stored
  }
  
  export interface EnergyConsumption {
    timestamp: Date;
    consumption: number; // kWh
    distance: number; // km
    speed: number; // km/h
    temperature: number; // celsius
  }
  
  export interface ChargingStation {
    id: string;
    name: string;
    location: [number, number];
    availableChargers: number;
    chargingSpeed: number; // kW
    supportedVehicleTypes: string[];
    greenEnergyPercentage: number;
  }
  
  export interface EnvironmentalFactors {
    temperature: number;
    humidity: number;
    altitude: number;
    roadType: 'highway' | 'city' | 'mountain' | 'mixed';
  }