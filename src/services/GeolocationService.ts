// src/services/GeolocationService.ts
export class GeolocationService {
    static getCurrentLocation(): Promise<[number, number]> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'));
          return;
        }
  
        navigator.geolocation.getCurrentPosition(
          position => {
            // Round coordinates to 4 decimal places for privacy and performance
            const latitude = Number(position.coords.latitude.toFixed(4));
            const longitude = Number(position.coords.longitude.toFixed(4));
            resolve([latitude, longitude]);
          },
          error => {
            console.error('Error obtaining location', error);
            // Fallback to a default location (e.g., New York City)
            resolve([40.7128, -74.0060]);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      });
    }
  
    static calculateDistance(
      lat1: number, 
      lon1: number, 
      lat2: number, 
      lon2: number
    ): number {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }
  
    private static deg2rad(deg: number): number {
      return deg * (Math.PI/180);
    }
  }