import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MapComponent from './Component/MapComponent';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
const App = () => {
  const [myLocation, setMyLocation] = useState(false);

  useEffect(() => {
    function getMyLocation() {
      requestLocationPermission();
    }
    getMyLocation();
  });

  //---------------Function for location permission-----------
  async function requestLocationPermission() {
    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (response == 'granted') {
      await Geolocation.getCurrentPosition(
        ({coords}) => {
          setMyLocation(coords);
        },
        error => {
          Alert.alert(error.code, error.message);
        },
        {
          enabledHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }

  //-------------------END----------------

  return (
    <View style={styles.body}>
      <MapComponent/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
