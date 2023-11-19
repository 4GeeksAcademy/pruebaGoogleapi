import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import  React, { useState } from "react";
import "../../styles/map.css";

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ lat: 18.52043, lng: 73.856743 });

  const onLoad = mapInstance => {
    setMap(mapInstance);
  };

  const onMarkerDragEnd = event => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(markerPosition);
  };

  const onMapClick = event => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(markerPosition)
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onLoad}
          center={center}
          zoom={10}
          onClick={onMapClick}
          >
          <Marker position={markerPosition} icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"} draggable={true}
            onDragEnd={onMarkerDragEnd} />
        </GoogleMap>
      )}
    </div>
  );
};

