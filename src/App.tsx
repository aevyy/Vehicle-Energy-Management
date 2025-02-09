// src/App.tsx
import React, { useState, useEffect } from 'react';
import EnergyDashboard from './components/EnergyDashboard';
import BatteryMonitor from './components/BatteryMonitor';
import { Vehicle } from './models/VehicleModel';
import { ChargingStation } from './models/chargingStationModel';
import { GeolocationService } from './services/GeolocationService';
import { ErrorBoundary, LoadingSpinner } from './components';
import VehicleConnectivityService from './services/VehicleConnectivityService';
import EnergyConsumptionChart from './components/EnergyConsumptionChart';
import './App.css';

const App: React.FC = () => {
  // Remove default demoVehicle; start with null until connected
  const [demoVehicle, setDemoVehicle] = useState<Vehicle | null>(null);

  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [nearbyChargingStations, setNearbyChargingStations] = useState<ChargingStation[]>([]);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const fetchLocation = async () => {
    setIsLocating(true);
    setLocationError(null);
    try {
      const location = await GeolocationService.getCurrentLocation();
      setCurrentLocation(location);
    } catch (error: any) {
      console.error('Failed to get location', error);
      setLocationError('Unable to get current location.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleConnectVehicle = async () => {
    setIsConnecting(true);
    setConnectionStatus(null);
    try {
      const result = await VehicleConnectivityService.connectToVehicle(currentLocation);
      setConnectionStatus(`Vehicle Connected: ${result.vehicleData.make} ${result.vehicleData.model}`);
      setDemoVehicle(result.vehicleData);
    } catch (error) {
      console.error('Vehicle connection failed:', error);
      if (error instanceof Error) {
        setConnectionStatus(error.message);
      } else {
        setConnectionStatus('Vehicle connection failed');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const mockChargingStations: ChargingStation[] = [
        {
          id: 'CS001',
          name: 'Downtown Charging Hub',
          location: currentLocation,
          availableChargers: 5,
          chargingSpeed: 150,
          supportedVehicleTypes: ['Tesla', 'Generic EV'],
          greenEnergyPercentage: 80
        }
      ];
      setNearbyChargingStations(mockChargingStations);
    }
  }, [currentLocation]);

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Vehicle Energy Management System</h1>
        <div className="connectivity-section">
          <h2>Vehicle Connectivity</h2>
          {isConnecting ? (
            <LoadingSpinner />
          ) : (
            <button onClick={handleConnectVehicle}>Connect Vehicle</button>
          )}
          {connectionStatus && <p>{connectionStatus}</p>}
        </div>
        
        {demoVehicle ? (
          <>
            <BatteryMonitor vehicle={demoVehicle} />
            <EnergyDashboard vehicle={demoVehicle} />
            <EnergyConsumptionChart vehicle={demoVehicle} />
          </>
        ) : (
          <p>Please connect your vehicle to see data.</p>
        )}
        
        <div className="location-section">
          <h2>Location Information</h2>
          {isLocating ? (
            <LoadingSpinner />
          ) : locationError ? (
            <p className="error">{locationError}</p>
          ) : currentLocation ? (
            <div className="location-info">
              <p>Latitude: {currentLocation[0]}</p>
              <p>Longitude: {currentLocation[1]}</p>
            </div>
          ) : null}
          <button onClick={fetchLocation}>Refresh Location</button>
        </div>
        
        <div className="charging-stations">
          <h2>Nearby Charging Stations</h2>
          {nearbyChargingStations.map(station => (
            <div key={station.id} className="charging-station">
              <h3>{station.name}</h3>
              <p>Available Chargers: {station.availableChargers}</p>
              <p>Charging Speed: {station.chargingSpeed} kW</p>
              <p>Green Energy: {station.greenEnergyPercentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;