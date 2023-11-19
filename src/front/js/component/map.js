import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox  } from "@react-google-maps/api";
import { useMemo } from "react";
import  React, { useState } from "react";
import "../../styles/map.css";

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
    libraries: ["places"], 
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

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      setMarkerPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      if (map) {
        map.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      }
      console.log(markerPosition);
    }
  };

  let searchBox;
  const onSearchBoxLoad = ref => {
    searchBox = ref;
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

          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Buscar dirección"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      )}
    </div>
  );
};

