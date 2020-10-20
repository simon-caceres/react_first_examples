import React, {useEffect} from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';


export default class App extends React.Component{
  state = {
    location: { coords: {} },
    errorMessage: null,
    loading: true
  }

  getLocation = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return this.setState({errorMessage: 'Permisos no aceptados'});
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({location})
    console.log(location)
    this.setState({loading: false})
  }
  componentDidMount () {
    this.getLocation()
  }
  render () {
    if (this.state.loading) {
      return <View><Text>loading...</Text></View>
    }
    
    return <View style={styles.container}>
              <MapView 
                style={{flex: 1}}
                initialRegion={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09
                }}
              />
          </View>
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
