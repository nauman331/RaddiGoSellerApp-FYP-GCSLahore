import { View, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import Header from '../../components/Header'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Home: React.FC = () => {
    const mapRef = useRef<MapView>(null);
    
    // Pickup location (user's current location)
    const [pickupLocation] = useState({ latitude: 37.3318456, longitude: -122.0296002 });

    // Dropoff location (destination)
    const [dropoffLocation] = useState({ latitude: 37.771707, longitude: -122.4053769 });

    // Google Maps API Key
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB0ZMpz2dC1R56WvJ7rVfZSPue3vLQm9nI';

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
            <Header />
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
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

                {/* Route line between pickup and dropoff */}
                <MapViewDirections
                    origin={pickupLocation}
                    destination={dropoffLocation}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="#10b981"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log('🚀 Started routing between', params.origin, 'and', params.destination);
                    }}
                    onReady={result => {
                        console.log('✅ Route loaded successfully!');
                        console.log('Distance:', result.distance, 'km');
                        console.log('Duration:', result.duration, 'min');
                        console.log('Coordinates:', result.coordinates.length);
                        
                        // Fit map to show entire route
                        mapRef.current?.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 50,
                                bottom: 50,
                                left: 50,
                                top: 50,
                            },
                            animated: true,
                        });
                    }}
                    onError={(errorMessage) => {
                        console.error('❌ Directions Error:', errorMessage);
                        Alert.alert('Route Error', `Failed to load route: ${errorMessage}`);
                    }}
                    mode="DRIVING"
                />
            </MapView>
        </View>
    )
}

export default Home