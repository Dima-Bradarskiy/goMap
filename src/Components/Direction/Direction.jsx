import React, { useEffect, useState } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';





const DirectionsComponent = ({ googleAPIKey, center , markers}) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    getDirections();
  }, [markers,center]);

  const getDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    
    const origin = center;
    const destination = markers.length > 0 ? markers[markers.length - 1] : null;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          setDirections(response);
        } else {
          console.error('Error getting directions:', status);
        }
      }
    );
  };

  return (
    <div>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />
      )}
    </div>
  );
};

export default DirectionsComponent;
