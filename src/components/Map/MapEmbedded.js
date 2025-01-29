import React from 'react'
import { MapContainer,Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


const MapEmbedded = ({longitude,latitude,Property}) => {
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", // Custom marker image URL
    iconSize: [40, 40],  // Size of the icon [width, height]
    iconAnchor: [20, 40], // Anchor point (center-bottom)
    popupAnchor: [0, -35], // Popup position relative to the marker
  });

  return (
    <MapContainer center={[latitude,longitude]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <Marker position={[latitude,longitude]} icon={customIcon}>
        <Popup>{Property}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapEmbedded


{/* <TileLayer
        url="https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=4S6JGD9GKKl8fyuNxxdGlzCH4Uv3VnP60khJgh_wTF8"
      /> */}