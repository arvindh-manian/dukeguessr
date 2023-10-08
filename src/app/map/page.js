"use client";

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = () => {
    console.log(process.env.NEXT_PUBLIC_GM_KEY);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GM_KEY,
    });

    const center = { lat: 36.0014, lng: 78.9382 }; 

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <GoogleMap
                center={{ lat: 36.0014, lng: -78.9382 }}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Map;
