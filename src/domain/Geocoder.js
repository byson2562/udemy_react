import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';
const KEY = 'AIzaSyBrG81IZPRIE5TuFrP2rDmLwsh6lyQKkG0';

export const geocode = (place) =>
  axios
    .get(GEOCODE_ENDPOINT, { params: { address: place , key: KEY }})
    .then((results) => {
      const data = results.data;
      const status = data.status;
      const result = data.results[0];

      if (typeof result === 'undifined') {
        return { status };
      };

      const address = result.formatted_address;
      const location = result.geometry.location;
      return { address, location, status };
    })
;

export const reverseGeocode = () => null;