"use client";
import React from "react";
import { useState } from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ onMarkerPositionChange, onNewCenter, imageMarkerPosition }) => {
    const [marker, setMarker] = useState(null);
    const [newCenter, setNewCenter] = useState(null);
    const center = { lat: 36.0014, lng: -78.9382 };
    var recenter = { lat: 36.0014, lng: -78.9382 };

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
        if(!pauseMarker){
            setMarker({
                lat: latLng.lat(),
                lng: latLng.lng(),
            });
            const lat = latLng.lat();
            const lng = latLng.lng();
            onMarkerPositionChange({ lat, lng });
            // onNewCenter(map.getCenter().lat(), map.getCenter().lng())
            // setNewCenter({
            //     lat: map.getCenter().lat(),
            //     lng: map.getCenter().lng()
            // })
        3}
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "50%", height: "55vh" }}>
            <GoogleMap
                center={newCenter || center}
                zoom={15}
                mapContainerStyle={{ width: "400px", height: "383px" }}
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
