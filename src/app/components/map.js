"use client";
import React from 'react';
import { useState } from "react";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = ( {onMarkerPositionChange} ) => {
    const [marker, setMarker] = useState(null);
    const center = { lat: 36.0014, lng: -78.9382 };

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
        if(marker){
            console.log("Updating marker position");
            marker.setPosition(latLng);
        }
        else{
            const newMarker = new window.google.maps.Marker({
                position: latLng,
                map: map,
            });
            setMarker(newMarker);
            console.log("newmarker to marker: ", marker);
        }
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
        <div style={{ width: '50%', height: '50vh' }}>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                onLoad={handleMapLoad}
            />
        </div>
    );
};

export default Map;