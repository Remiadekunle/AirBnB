import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.5899371,
  lng: -122.0290482,
};

const Maps = ({ apiKey }) => {
  console.log('what is going on 22222222222222', typeof apiKey)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
            <Marker position={{ lat: 37.5899371, lng: -122.0290482}} />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
