import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';

export default class MapComponent extends Component {
  state = {
    coordinate: {
      latitude: 23.37725,// initial location
      longitude: 72.46125,
    },
    marginBottom: 1
  };

  render() {
    let {latitude, longitude} = this.state.coordinate;
    return (
      <View style={styles.maps}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={[styles.maps, {marginBottom: this.state.marginBottom}]}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={region =>
            this.setState({
              coordinate: region,
            })
          }
          onMapReady={() => {
            this.setState({marginBottom: 0});
          }}>
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            pinColor="blue"
          />
        </MapView>
        <Text>Latitude:{latitude}</Text>
        <Text>Longitude:{longitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maps: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
});
