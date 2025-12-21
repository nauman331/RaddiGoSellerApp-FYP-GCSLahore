import { View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Home: React.FC = () => {
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

                {/* Route line between pickup and dropoff */}
                <MapViewDirections
                    origin={pickupLocation}
                    destination={dropoffLocation}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor="#10b981"
                    onError={(errorMessage) => {
                        console.log('Directions Error:', errorMessage);
                    }}
                />
            </MapView>
        </View>
    )
}

export default Home