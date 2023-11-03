import style from './App.module.css';

import {useJsApiLoader } from '@react-google-maps/api';
import { MODES } from './Components/Map/Map.jsx';
import {Map} from './Components/Map/Map.jsx';

import Autocomplete from './Components/Autocomplete/Autocomplete.jsx';
import { useCallback, useEffect, useState } from 'react';
import { getBrowserLocation } from './utils/geo.js';

const API_KEY = process.env.REACT_APP_API_KEY;

const libraries = ['places'];

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};


const App = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
const onPlaceSelect = useCallback(
  (coordinates)=>{
    setCenter(coordinates);
},[]);

const toggleMode = useCallback(() =>{

  switch(mode){
    case MODES.MOVE: setMode(MODES.SET_MARKER);
    break;
    case MODES.SET_MARKER: setMode(MODES.MOVE);
    break;
    default: setMode(MODES.MOVE);
  }
},[mode]);

const onMarkerAdd = useCallback((coordinates) =>{
  setMarkers([...markers,coordinates]);
},[markers]);

const clear = useCallback(() =>{
  setMarkers([]);
},[])

// useEffect(()=>{
//   getBrowserLocation().then((curLoc)=>{
//     setCenter(curLoc);
//   })
//   .catch((defaultLocation) =>{
//     setCenter(defaultLocation);
//   },[])
// })
  return (
    <div>
      <div className={style.adressSearchContainer}>
    <Autocomplete  isLoaded={isLoaded} onSelect={onPlaceSelect}/>
    <button onClick={toggleMode}>Set markers</button>
    <button onClick={clear}> Clear</button>
      </div>
      {isLoaded ? <Map center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd} api_key={API_KEY} /> : <h2>Loading....</h2>}

    </div>
  );
}

export default App;
