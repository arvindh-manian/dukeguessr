'use client'
import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

/**
 * Render a Google Map component with markers and handle marker placement.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - onMarkerPositionChange: Function called when the marker position changes.
 *   - onNewCenter: Function called when the map center changes.
 *   - imageMarkerPosition: The position of the image marker.
 *   - userMarkerPosition: The position of the user marker.
 *   - pauseMarker: Boolean indicating if marker placement is paused.
 *   - center: The center of the map.
 * @return {JSX.Element} The rendered Google Map component.
 */
const Map = ({
  onMarkerPositionChange,
  onNewCenter,
  imageMarkerPosition,
  userMarkerPosition,
  pauseMarker,
  center
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GM_KEY
  })

  const handleMapLoad = map => {
    console.log('handleMapLoad called')
    map.addListener('click', e => {
      placeMarker(e.latLng, map)
    })
  }

  const placeMarker = (latLng, map) => {
    if (!pauseMarker) {
      const lat = latLng.lat()
      const lng = latLng.lng()
      onMarkerPositionChange({ lat, lng })
      onNewCenter({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
      })
      5
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const userMarkerCookie = Cookies.get('selectedMarker')
  console.log('cookiemarker', userMarkerCookie)

  return (
    <div style={{ width: '50%', height: '55vh', paddingTop: '5px' }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '400px', height: '383px' }}
        onLoad={handleMapLoad}
      >
        {userMarkerPosition && userMarkerCookie && !pauseMarker ? (
          <Marker
            position={{
              lat: userMarkerPosition.lat,
              lng: userMarkerPosition.lng
            }}
            icon={{
              url: `/images/${userMarkerCookie}.png`,
              scaledSize: new window.google.maps.Size(42, 44)
            }}
          ></Marker>
        ) : (
          userMarkerPosition && (
            <Marker
              position={{
                lat: userMarkerPosition.lat,
                lng: userMarkerPosition.lng
              }}
              icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            ></Marker>
          )
        )}

        {imageMarkerPosition && (
          <Marker
            position={imageMarkerPosition}
            icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default Map
