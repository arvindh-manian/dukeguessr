"use client";
import React from "react";
import { useState } from "react";
import Cookies from 'js-cookie';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ onMarkerPositionChange, onNewCenter, imageMarkerPosition, userMarkerPosition, pauseMarker, center }) => {
    const [marker, setMarker] = useState(null);
    
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
            onNewCenter({
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            })
        5}
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const userMarkerCookie = Cookies.get("selectedMarker");
    console.log("cookiemarker", userMarkerCookie)

    return (
        <div style={{ width: "50%", height: "55vh", paddingTop: "5px" }}>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "400px", height: "383px" }}
                onLoad={handleMapLoad}>
                {marker && userMarkerCookie && !pauseMarker ? (
                    <Marker
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                        icon={{
                            url: `/images/${userMarkerCookie}.png`,
                            scaledSize: new window.google.maps.Size(42, 44),
                        }}
                        ></Marker>
                ): marker && (
                    <Marker
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                        icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                    ></Marker>
                )}

                {imageMarkerPosition && (
                    <Marker 
                    position={imageMarkerPosition}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
                )}

                {userMarkerCookie && userMarkerPosition ? (
                    <Marker 
                    position={userMarkerPosition}
                    icon={{
                        url: `/images/${userMarkerCookie}.png`,
                        scaledSize: new window.google.maps.Size(42, 44),
                    }} />
                ): userMarkerPosition && (
                    <Marker 
                    position={userMarkerPosition}
                    icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default Map;
