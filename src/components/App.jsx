import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';

import { geocode } from '../domain/Geocoder';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';
const KEY = 'AIzaSyBrG81IZPRIE5TuFrP2rDmLwsh6lyQKkG0';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      }
    }
  }

  setErrorMassage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      }
    })
  }

  handlePlaceSubmit(place) {
    geocode(place)  
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            break;
          }
          case 'ZERO_RESULTS' : {
            this.setErrorMassage('結果が見つかりませんでした');
            break;
          }
          default: {
            this.setErrorMassage('エラーが発生しました');
          }
        }
      })
      .catch((error) => {
        this.setErrorMassage('通信に失敗しました');
      })
  }


  render(){
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={(place) => this.handlePlaceSubmit(place)} />
        <GeocodeResult 
          address = {this.state.address}
          location = {this.state.location}
        />
        <Map
          location = {this.state.location}
        />
      </div>
    );
  }
}

export default App;