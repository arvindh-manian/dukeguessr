"use client";
import React from "react";
import { useState } from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ onMarkerPositionChange, onNewCenter, imageMarkerPosition, userMarkerPosition, pauseMarker }) => {
    const [marker, setMarker] = useState(null);
    const [newCenter, setNewCenter] = useState(null);
    const center = { lat: 36.0014, lng: -78.9382 };
    var recenter = { lat: 36.0014, lng: -78.9382 };
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
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log("Coordinates:", lat, lng);
        console.log("New center: ", recenter);
        onMarkerPositionChange({ lat, lng });
        onNewCenter(map.getCenter().lat(), map.getCenter().lng())
        setNewCenter({
            lat: map.getCenter().lat(),
            lng: map.getCenter().lng()
        })
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "50%", height: "50vh" }}>
            <GoogleMap
                center={newCenter || center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onLoad={handleMapLoad}>
                {marker && !pauseMarker && (
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
                {userMarkerPosition && (
                    <Marker 
                    position={userMarkerPosition}
                    icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"} />
                )}
            </GoogleMap>
        </div>
    );
};

export default Map;
