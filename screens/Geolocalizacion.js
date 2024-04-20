import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const Geolocalizacion = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
          onLayout={() => setMapReady(true)} 
        >
          {mapReady && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Tu Ubicación"
              description="Aquí estás actualmente"
            />
          )}
        </MapView>
      ) : (
        <Text>{errorMsg || 'Obteniendo ubicación...'}</Text>
      )}
    </View>
  );
};

export default Geolocalizacion;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  map: {
    flex: 1, 
  },
});
