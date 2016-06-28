/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
} from 'react-native';
import { fetchWeather } from './src/api';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [{ latitude: 41.132, longitude: -73.99 }],
      weather: { city: '', temperature: '', description: '' },
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }
  onRegionChangeComplete(coords) {
    const {latitude, longitude} = coords;
    this.setState({
      pins: [{ latitude, longitude }],
    });
    fetchWeather(latitude, longitude)
      .then(weather => {
        this.setState({ weather });
        console.log(this.state.weather);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={this.state.pins}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.weather.city}</Text>
          <Text style={styles.text}>{this.state.weather.temperature}</Text>
          <Text style={styles.text}>{this.state.weather.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 2,
    marginTop: 30,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Weather', () => Weather);
