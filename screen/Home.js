import React from "react";

import { StatusBar, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Movies from "../components/Movies";
import { filterByCountry, getLocation } from "../services/movieFilter";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesJson = require("../assets/movies.json");
      const position = await getLocation();
      const nationalMovies = await filterByCountry(moviesJson, position);
      setNationalMovies(nationalMovies);

      const nationalMoviesTitles = nationalMovies.map(
        (item, index) => item.Title
      );

      moviesWithoutNationals = moviesJson.filter((item, index) => {
        return !nationalMoviesTitles.includes(item.Title);
      });

      setMovies(moviesWithoutNationals);
    };
    loadingMovies();
  }, []);

  getResumeMovie = (user) => {
    const moviesToResume = require("../assets/moviesToResume.json");
    return moviesToResume[user];
  };

  return (
    <ProfileContext.Consumer>
      {({ user, changeProfile }) => (
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
            <Movies label="Recomendados" item={movies} />

            {nationalMovies.length > 0 && (
              <Movies label="Nacionais" item={nationalMovies} />
            )}
            {user && (
              <Movies
                label={`Continuar assistindo como ${user}`}
                item={getResumeMovie(user)}
              />
            )}
          </Container>
        </>
      )}
    </ProfileContext.Consumer>
  );
};

export default Home;