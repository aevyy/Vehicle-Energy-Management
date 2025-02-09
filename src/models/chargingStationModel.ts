// src/models/ChargingStationModel.ts
export interface ChargingStation {
    id: string;
    name: string;
    location: [number, number];
    availableChargers: number;
    chargingSpeed: number;
    supportedVehicleTypes: string[];
    greenEnergyPercentage: number;
  }