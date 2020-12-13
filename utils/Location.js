import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoder';

export const GetCountry = (({lat, lng}) => {
  return new Promise((resolve, reject) => {
    Geocoder.geocodePosition({
      lat,
      lng
    })
    .then((location) => {
      location.forEach(function(value) {
          if(value.countryCode !== null){
              resolve(value.countryCode);
          }
        });
    })
    .catch((error) => {
      reject(error)
    })
  })
})

export const GetLocation = () => {
  return new Promise((resolve, reject) => {
    const getLocation = (info) => {
      resolve(info)
    } 

    const getLocationError = (error) => {
      reject(error)
    }

    Geolocation.getCurrentPosition(
      getLocation,
      getLocationError
    );
  })
}
