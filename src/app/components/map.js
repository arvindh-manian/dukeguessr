"use client";
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GM_KEY,
    });

    const center = { lat: 36.0014, lng: -78.9382 };
    var marker;
    const handleMapLoad = (map) => {
        map.addListener("click", (e) => {
            placeMarker(e.latLng, map);
        });
    };

    const placeMarker = (latLng, map) => {
        if(marker){
            marker.setPosition(latLng);
        }
        else{
            marker = new window.google.maps.Marker({
                position: latLng,
                map: map,
            });
        }
        map.panTo(latLng);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: '100%', height: '100vh' }}>
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