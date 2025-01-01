import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapView from './MapView';

export default function Map({ lat, lon }) {
    
    return (
        <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} style={{ height: "40vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
                <Popup>
                    המיקום שלך
                </Popup>
            </Marker>
            <MapView lat={lat} lon={lon} />  {/* העברת המיקום לעדכון המפה */}
        </MapContainer>
    );
}


