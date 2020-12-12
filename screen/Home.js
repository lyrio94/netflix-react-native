import React, { useEffect, useState } from "react";

import { StatusBar, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Movies from "../components/Movies";
import { filterByCountry, getLocation } from "../services/movieFilter";
import { ProfileContext } from "../context/ProfileContext";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get("window").height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const obtainLocation = async () => {
      try {
        const result = await getLocation();
        setPosition(result);
      } catch (error) {
        console.log("obtainLocation error", error);
      }
    };

    obtainLocation();
  }, []);

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesJson = require("../assets/Movies.json");
      let nationalMovies = [];

      try {
        if (position !== null) {
          nationalMovies = await filterByCountry(moviesJson, position);
          setNationalMovies(nationalMovies);
        }
      } catch (error) {
        console.log(error);
      }

      const nationalMoviesTitles = nationalMovies.map((item) => item.Title);

      moviesWithoutNationals = moviesJson.filter((item, index) => {
        return !nationalMoviesTitles.includes(item.Title);
      });

      setMovies(moviesWithoutNationals);
    };
    loadingMovies();
  }, [position]);

  return (
    <ProfileContext.Consumer>
      {({ user }) => (
        <>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Container>
            <Poster source={require("../assets/poster.jpg")}>
              <Gradient
                locations={[0, 0.2, 0.6, 0.93]}
                colors={[
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,0.0)",
                  "rgba(0,0,0,0.0)",
                  "rgba(0,0,0,1)",
                ]}
              >
                <Header />
                <Hero />
              </Gradient>
            </Poster>
            <Movies label={`Continuar assistindo ${user}`} data={movies} />
            <Movies label="Recomendados" data={movies} />
            <Movies label="Top 10" data={movies} />
            {nationalMovies && nationalMovies.length > 0 && (
              <Movies label="Nacionais" data={nationalMovies} />
            )}
          </Container>
        </>
      )}
    </ProfileContext.Consumer>
  );
};

export default Home;
