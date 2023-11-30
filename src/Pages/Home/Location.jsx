import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Location = () => {
  const position = [24.1156, 90.2501];
  return (
    <div className="mt-12 rounded-lg">
      <MapContainer center={position} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Main Office <br />
            Kaliakoir, Gazipur, Dhaka
          </Popup>
        </Marker>
        <Marker position={[23.9271, 90.2696]}>
          <Popup>
            Branch <br />
            Ashulia, Savar, Dhaka
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;
