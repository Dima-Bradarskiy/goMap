import React, { useCallback } from "react";
import { GoogleMap, Marker, MarkerF } from '@react-google-maps/api';
import style from './Map.module.css'
import DirectionsComponent from "../Direction/Direction";
const containerStyle = {
    width: '100%',
    height: '100%'
};


const defaultOptions={
    panControl:true,
    zoomControl:true,
    mapTypeControl:false,
    scaleControl:false,
    streetViewControl:false,
    rotateControl:false,
    clickableIcons:false,
    keyboardShortcuts:false,
    scrollwheel:false,
    disableDobleClickZoom:false,
    fullscreenControl:false,
}

export const MODES = {
    MOVE:0,
    SET_MARKER:1
  }




export const Map = ({ center,mode, markers, onMarkerAdd, api_key }) => {

    const mapRef = React.useRef(undefined)
    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

    const onClick = useCallback((loc) =>{
        if(mode === MODES.SET_MARKER){
            const lat = loc.latLng.lat();
            const lng = loc.latLng.lng();
            onMarkerAdd({lat, lng})
            console.log(lat,lng);
        }
    },[mode])
    return (
        <div className={style.container}> 
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={defaultOptions}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onClick}
                google={window.google}
            >
                { /* Child components, such as markers, info windows, etc. */}

                <MarkerF position={center}/>
                {markers.map((pos)=>{
                    return <Marker position={pos}/>
                })}

        <DirectionsComponent googleAPIKey={api_key} center={center} markers={markers} />
            </GoogleMap>
        </div>
    )
}
