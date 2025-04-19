import React, { useEffect, useState } from 'react';
import MapView from '../components/MapView';
import Results from '../components/Results';
import { getNearbyPlaces } from '../services/overpass';

const NearbyDoctors = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchNearbyPlaces = async (lat, lon) => {
        try {
            const nearby = await getNearbyPlaces(lat, lon, "hospital");
            if (nearby && nearby.length > 0) {
                setPlaces(nearby);
            } else {
                setErrorMessage("No nearby hospitals found in your area.");
            }
        } catch (error) {
            console.error("Error fetching nearby places:", error);
            setErrorMessage("Error fetching nearby hospitals. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setUserLocation({ lat, lon });
                fetchNearbyPlaces(lat, lon);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLocationError(true);
                setLoading(false);
                const fallbackLocation = { lat: 22.5744, lon: 88.3629 };
                setUserLocation(fallbackLocation);
                fetchNearbyPlaces(fallbackLocation.lat, fallbackLocation.lon);
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Find Nearby Healthcare Facilities
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Locate hospitals and medical facilities in your vicinity
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && !locationError && (
                    <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-lg text-gray-700">Locating healthcare facilities...</span>
                        </div>
                    </div>
                )}

                {locationError && !loading && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-yellow-700">
                                Could not fetch your location. Showing results for Kolkata.
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-700">{errorMessage}</p>
                        </div>
                    </div>
                )}

                {!loading && userLocation && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-500">Total Facilities Found</div>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-3xl font-semibold text-gray-900">{places.length}</div>
                                    <div className="ml-2 text-sm text-gray-500">locations</div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-500">Search Radius</div>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-3xl font-semibold text-gray-900">3</div>
                                    <div className="ml-2 text-sm text-gray-500">kilometers</div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-500">Your Location</div>
                                <div className="mt-2 text-lg font-medium text-gray-900">
                                    {locationError ? 'Kolkata' : 'Current Location'}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <MapView userLocation={userLocation} places={places} />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm">
                            <Results places={places} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default NearbyDoctors;
