// import { Location } from '@/types/booking';

// export class LocationService {
//   async calculateDistance(
//     origin: { lat: number; lng: number },
//     destination: { lat: number; lng: number }
//   ): Promise<{ distance: number; duration: number }> {
//     return new Promise((resolve, reject) => {
//       if (!window.google) {
//         reject(new Error('Google Maps not loaded'));
//         return;
//       }

//       const service = new google.maps.DistanceMatrixService();
      
//       service.getDistanceMatrix({
//         origins: [{ lat: origin.lat, lng: origin.lng }],
//         destinations: [{ lat: destination.lat, lng: destination.lng }],
//         travelMode: google.maps.TravelMode.DRIVING,
//         unitSystem: google.maps.UnitSystem.METRIC,
//       }, (response, status) => {
//         if (status === google.maps.DistanceMatrixStatus.OK && response) {
//           const result = response.rows[0]?.elements[0];
          
//           if (result?.status === 'OK') {
//             const distanceInKm = result.distance?.value ? result.distance.value / 1000 : 0;
//             const durationInMin = result.duration?.value ? result.duration.value / 60 : 0;
            
//             resolve({
//               distance: Math.round(distanceInKm * 100) / 100, // Round to 2 decimal places
//               duration: Math.round(durationInMin)
//             });
//           } else {
//             reject(new Error('Could not calculate route'));
//           }
//         } else {
//           reject(new Error('Distance Matrix request failed'));
//         }
//       });
//     });
//   }
// }