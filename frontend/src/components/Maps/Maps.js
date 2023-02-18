import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './index.css'



const center = {
  lat: 37.5899371,
  lng: -122.0290482,
};



const Maps = ({ apiKey, lat, lng, price,  containerStyle, scrollwheel}) => {
  // console.log('what is going on 22222222222222', typeof apiKey)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const defaultMapOptions = {
    fullscreenControl: false,
    fullscreenControl: false,
    scrollwheel: scrollwheel,
    mapTypeControl: false,
    streetViewControlOptions: {
      position: window.google?.maps.ControlPosition.RIGHT_TOP
    },
    zoomControlOptions: {
      position: window.google?.maps.ControlPosition.RIGHT_TOP
    },
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: lat, lng: lng}}
          zoom={13}
          options={defaultMapOptions}
        >
            <Marker position={{ lat: lat, lng: lng}} shape={{type: 'rect'}} label={
              {
                text: `$${price}.00`,
                className:'google-maps-label',
                color: 'white',
              }
            } icon={{
              url: 'https://cdn-icons-png.flaticon.com/512/54/54786.png',
              scaledSize: new window.google.maps.Size(60, 60),
              label: 'test'
              }}/>


        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
