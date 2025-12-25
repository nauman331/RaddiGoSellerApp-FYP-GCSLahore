import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import type { LiveMapProps } from '../types/map';



const LiveMap: React.FC<LiveMapProps> = ({ pickupLocation, dropoffLocation }) => {

    // Track route coordinates and errors
    const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
    const [directionsError, setDirectionsError] = useState(false);

    // Fetch route from OSRM on component mount
    useEffect(() => {
        fetchOSRMRoute();
    }, []);

    const fetchOSRMRoute = async () => {
        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${pickupLocation.longitude},${pickupLocation.latitude};${dropoffLocation.longitude},${dropoffLocation.latitude}?overview=full&geometries=geojson`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 'Ok') {
                const coords = data.routes[0].geometry.coordinates.map((coord: number[]) => ({
                    latitude: coord[1],
                    longitude: coord[0]
                }));
                setRouteCoordinates(coords);
                setDirectionsError(false);
            } else {
                console.log('OSRM Error:', data.code);
                setDirectionsError(true);
            }
        } catch (error) {
            console.error('OSRM Fetch Error:', error);
            setDirectionsError(true);
        }
    };

    // Calculate region to fit both markers
    const getMapRegion = () => {
        const midLat = (pickupLocation.latitude + dropoffLocation.latitude) / 2;
        const midLng = (pickupLocation.longitude + dropoffLocation.longitude) / 2;
        const deltaLat = Math.abs(pickupLocation.latitude - dropoffLocation.latitude) * 2;
        const deltaLng = Math.abs(pickupLocation.longitude - dropoffLocation.longitude) * 2;

        return {
            latitude: midLat,
            longitude: midLng,
            latitudeDelta: Math.max(deltaLat, 0.02),
            longitudeDelta: Math.max(deltaLng, 0.02),
        };
    };

    return (
        <View className='flex-1'>
            <MapView
                provider="google"
                style={{ flex: 1 }}
                initialRegion={getMapRegion()}
            >
                {/* Pickup Location Marker */}
                <Marker
                    coordinate={pickupLocation}
                    title="Pickup Location"
                    description="Your current location"
                    pinColor="green"
                />

                {/* Dropoff Location Marker */}
                <Marker
                    coordinate={dropoffLocation}
                    title="Drop-off Location"
                    description="Your destination"
                    pinColor="red"
                />

                {/* Route line from OSRM */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={4}
                        strokeColor="#10b981"
                    />
                )}

                {/* Fallback straight line when directions fail */}
                {directionsError && (
                    <Polyline
                        coordinates={[pickupLocation, dropoffLocation]}
                        strokeWidth={4}
                        strokeColor="#ef4444"
                        lineDashPattern={[10, 5]}
                    />
                )}
            </MapView>
        </View>
    )
}

export default LiveMap