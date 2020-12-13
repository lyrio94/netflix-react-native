import React, { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";
import { StatusBar, Dimensions } from "react-native";
import styled from "styled-components/native";
import { ProfileContext } from "../context/ProfileContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Movies from "../components/Movies";
import { filterByCountry, getLocation } from "../services/movieFilter";
import { GetLocation, GetCountry } from "../utils/Location";

const api = [
  require("../assets/movies/movie1.jpg"),
  require("../assets/movies/movie2.jpg"),
  require("../assets/movies/movie3.jpg"),
  require("../assets/movies/movie4.jpg"),
];

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get("window").height * 81) / 100}px;
`;

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    GetLocation()
      .then((info) => {
        setPosition(info);
      })
      .catch(() => setPosition(null));
  }, []);

  useEffect(() => {
    const getNationalMovies = async () => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const country = await GetCountry({ lat, lng });
        console.log("country", country);

        const filteredMovies = movies.filter((item, index) => {
          return item.Country.indexOf(country) !== -1;
        });
        setNationalMovies(filteredMovies);
      }
    };
    getNationalMovies();
  }, [position]);

  useEffect(() => {
    const data = require("../assets/Movies.json");
    setMovies(data);
  }, []);

  console.log("position", position);

  const onObtainPosition = (position) => {
    console.log("position", position);
    const pos = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    Geocoder.geocodePosition(pos).then((res) => {
      console.log(res);
    });
  };

  Geolocation.getCurrentPosition(onObtainPosition, (error) =>
    console.error(error)
  );

  return (
    <ProfileContext.Consumer>
      {({ user }) => {
        let movieToResume = [];
        if (user) {
          const data = require("../assets/moviesToResume.json");
          movieToResume = data[user];
        }
        return (
          <>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Container>
              <Poster source={require("../assets/poster.jpg")}>
                <Header />
                <Hero />
              </Poster>
              <Movies
                label={`Continuar assistindo como ${user}`}
                data={nationalMovies}
              />
              <Movies label="Nacionais" data={nationalMovies} />
              <Movies label="Recomendados" data={movies} />
              <Movies label="Top 10" data={movies} />
            </Container>
          </>
        );
      }}
    </ProfileContext.Consumer>
  );
};

export default Home;
