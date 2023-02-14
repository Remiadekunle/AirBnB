import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({center, lat, lng, price}) => {
  console.log('were just following the flow')
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
      console.log('we are getting the key')
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps apiKey={key} center={center} lat={lat} lng={lng} price={price} />
  );
};

export default MapContainer;
