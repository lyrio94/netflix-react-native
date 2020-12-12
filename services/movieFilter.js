import Geocoder from "react-native-geocoder";
import Geolocation from "@react-native-community/geolocation";

export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    const onReceiveLocation = (geolocation) => {
      resolve(geolocation);
    };

    Geolocation.getCurrentPosition(onReceiveLocation, (error) => {
      console.log(error);
      reject();
    });
  });
};

export const filterByCountry = async (movies, geolocation) => {
  const location = await Geocoder.geocodePosition({
    lat: geolocation.coords.latitude,
    lng: geolocation.coords.longitude,
  });

  const national = movies.filter((item, index) => {
    return (isYourCountry =
      item.Country.indexOf(location[0].country) !== -1 ||
      item.Country.indexOf(location[0].countryCode) !== -1);
  });
  return national;
};
