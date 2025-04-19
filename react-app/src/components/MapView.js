import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
// Custom icons for markers
const userIcon = new L.Icon({
  iconUrl: require("../assets/user-marker.png"),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const hospitalIcon = new L.Icon({
  iconUrl: require("../assets/hospital-marker.png"),
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const MapView = ({ userLocation, places }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      const map = mapRef.current;
      map.setView([userLocation.lat, userLocation.lon], 14);

      // Adding user location marker with custom icon
      const userMarker = L.marker([userLocation.lat, userLocation.lon], {
        icon: userIcon
      }).addTo(map);

      userMarker.bindPopup(
        L.popup({
          className: 'custom-popup',
          closeButton: false,
        }).setContent("📍 Your Location")
      ).openPopup();

      if (routingControlRef.current) {
        routingControlRef.current.removeFrom(map);
      }
    }
  }, [userLocation]);

  const handleDirectionsClick = (hospital) => {
    if (userLocation) {
      const { lat, lon } = hospital;

      if (routingControlRef.current) {
        routingControlRef.current.removeFrom(mapRef.current);
      }

      const route = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lon),
          L.latLng(lat, lon),
        ],
        routeWhileDragging: true,
        createMarker: () => null,
        showAlternatives: false,
        lineOptions: {
          styles: [
            { color: '#4A90E2', weight: 4, opacity: 0.7 }
          ]
        },
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        containerClassName: 'custom-routing-container',
      }).addTo(mapRef.current);

      routingControlRef.current = route;
    }
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2 className="text-2xl font-semibold mb-4">Nearby Healthcare Facilities</h2>
        <p className="text-gray-600 mb-4">
          Found {places.length} healthcare facilities in your area
        </p>
      </div>
      <div className="map-wrapper rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[userLocation.lat, userLocation.lon]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-[600px] w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User marker */}
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={userIcon}
          >
            <Popup className="custom-popup">
              <div className="text-center">
                <span className="text-lg font-semibold">📍 Your Location</span>
              </div>
            </Popup>
          </Marker>

          {/* Hospital markers */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={hospitalIcon}
            >
              <Popup className="custom-popup">
                <div className="hospital-popup">
                  <h3 className="text-lg font-semibold mb-2">
                    🏥 {place.name}
                  </h3>
                  <button
                    onClick={() => handleDirectionsClick(place)}
                    className="get-directions-btn"
                  >
                    <span className="mr-2">🚗</span>
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-legend mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Map Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <img src={require("../assets/user-marker.png")} alt="User" className="w-6 h-6 mr-2" />
            <span>Your Location</span>
          </div>
          <div className="flex items-center">
            <img src={require("../assets/hospital-marker.png")} alt="Hospital" className="w-6 h-6 mr-2" />
            <span>Healthcare Facility</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
