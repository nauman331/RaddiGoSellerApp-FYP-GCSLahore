import { View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import MapView, { Marker, Polyline } from 'react-native-maps';

const Home: React.FC = () => {
    // Pickup location (user's current location)
    const [pickupLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    // Dropoff location (destination)
    const [dropoffLocation] = useState({
        latitude: 37.79525,
        longitude: -122.4194,
    });

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
                <Polyline
                    coordinates={[pickupLocation, dropoffLocation]}
                    strokeColor="#4285F4"
                    strokeWidth={4}
                />
            </MapView>
        </View>
    )
}

export default Home