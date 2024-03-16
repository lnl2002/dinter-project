import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from 'google-map-react';

export default function DinterGoogleMap({
  onChooseCoor
}) {
  const mapRef = useRef()
  const markerRef = useRef()
  const defaultCenter = {
    lat: 21.0278,
    lng: 105.8342
  }
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10); // Set an initial zoom 

  useEffect(() => {
    onChooseCoor({lat: center.lat, lng: center.lng})
  }, [center])

  const handleMapOnClick = (e) => {
    const lat = e.lat;
    const lng = e.lng
    setCenter({
      lat: lat,
      lng: lng
    })
    setNewMarker({
      lat: lat,
      lng: lng
    })
    onChooseCoor({lat: e.lat, lng: e.lng})
  }

  const setNewMarker= ({lat, lng}) => {
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    markerRef.current = new mapRef.current.maps_.Marker({
      position: { lat: lat, lng: lng },
      map: mapRef.current.map_,
      title: 'Hello World!'
    });
  }

  const panToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setNewMarker({lat:latitude, lng:longitude})
          setZoom(15)
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '60vh', width: '50vw' }}>
      <button className="p-1 d-flex" style={{background: '#ff5961', color:'white', borderRadius: '0px 10px 0px 0px'}} onClick={() => panToCurrentLocation()}>Pan to current location
        <svg fill="#ffffff" style={{marginLeft: '10px'}} width={20} height={20} version="1.1" viewBox="0 0 489.536 489.536" enable-background="new 0 0 489.536 489.536" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="m488.554,476l-99-280.2c-1-4.2-5.2-7.3-9.4-7.3h-45.6c12.9-31.1 19.6-54.9 19.6-70.8 0-64.6-50-117.7-112.5-117.7-61.5,0-112.5,52.1-112.5,117.7 0,17.6 8.2,43.1 19.9,70.8h-39.7c-4.2,0-8.3,3.1-9.4,7.3l-99,280.2c-3.2,10.3 6.3,13.5 9.4,13.5h468.8c4.2,0.5 12.5-4.2 9.4-13.5zm-246.9-455.3c51,1.06581e-14 91.7,43.7 91.7,96.9 0,56.5-79.2,182.3-91.7,203.1-31.3-53.1-91.7-161.5-91.7-203.1 0-53.1 40.6-96.9 91.7-96.9zm-216.7,448l91.7-259.4h41.7c29.9,64.1 83.3,151 83.3,151s81.4-145.7 83.8-151h47.4l91.7,259.4h-439.6z"></path> <rect width="136.5" x="177.054" y="379.1" height="20.8"></rect> <path d="m289.554,108.2c0-26-21.9-47.9-47.9-47.9s-47.9,21.9-47.9,47.9 20.8,47.9 47.9,47.9c27.1,0 47.9-21.8 47.9-47.9zm-75-1c0-14.6 11.5-27.1 27.1-27.1s27.1,12.5 27.1,27.1-11.5,27.1-27.1,27.1c-14.6,2.84217e-14-27.1-12.5-27.1-27.1z"></path> </g> </g> </g></svg>
      </button>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: "AIzaSyDLHVjQMeDIL3abHPDgOUr4diHVm-jrLSM" }}
        center={center}
        zoom={zoom}
        defaultCenter={{
          lat: 21.0278,
          lng: 105.8342
        }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals={true}
        onClick={e => handleMapOnClick(e)}
      >
      </GoogleMapReact>
    </div>
  );
}