import { Vehicle } from '../models/VehicleModel';

interface ConnectivityResult {
  status: string;
  vehicleData: Vehicle;
}

function haversineDistance(loc1: [number, number], loc2: [number, number]): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const [lat1, lon1] = loc1;
  const [lat2, lon2] = loc2;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

class VehicleConnectivityService {
  public static connectToVehicle(currentLocation: [number, number] | null): Promise<ConnectivityResult> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!currentLocation) {
          reject(new Error('Current location unavailable.'));
        } else {
          // Simulated vehicle location (e.g., San Francisco coordinates)
          const simulatedVehicleLocation: [number, number] = [37.7749, -122.4194];
          const distance = haversineDistance(currentLocation, simulatedVehicleLocation);
          const thresholdKm = 30; // threshold in km for vehicle to be considered nearby
          if (distance <= thresholdKm) {
            resolve({
              status: 'connected',
              vehicleData: {
                id: '001',
                make: 'Tesla',
                model: 'Model 3',
                year: 2023,
                batteryCapacity: 75,
                currentCharge: 65,
                averageConsumption: 15,
                batteryType: 'Li-Ion',
                chargingEfficiency: 92
              }
            });
          } else {
            reject(new Error('No vehicles found nearby.'));
          }
        }
      }, 2000);
    });
  }
}

export default VehicleConnectivityService;