"use client";
import React from "react";
import { useState } from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ onMarkerPositionChange, imageMarkerPosition }) => {
    const [marker, setMarker] = useState(null);
    const center = { lat: 36.0014, lng: -78.9382 };
    console.log("Image marker: ")
    console.log(imageMarkerPosition);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GM_KEY,
    });

    const handleMapLoad = (map) => {
        console.log("handleMapLoad called");
        map.addListener("click", (e) => {
            placeMarker(e.latLng, map);
        });
    };

    const placeMarker = (latLng, map) => {
        setMarker({
            lat: latLng.lat(),
            lng: latLng.lng(),
        });
        console.log("moving to: " + latLng.lat(), latLng.lng());
        map.panTo(latLng);
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log("Coordinates:", lat, lng);
        onMarkerPositionChange({ lat, lng });
        //console.log("marker: ", marker);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "50%", height: "50vh" }}>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onLoad={handleMapLoad}>
                {marker && (
                    <Marker
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}></Marker>
                )}
                {imageMarkerPosition && (
                    <Marker 
                    position={imageMarkerPosition} />
        )}
            </GoogleMap>
        </div>
    );
};

export default Map;
