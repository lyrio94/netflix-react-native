import React from 'react';

import { StatusBar, Dimensions } from 'react-native';

import styled from 'styled-components/native';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';

const api = [
  require('../assets/movie1.jpg'),
  require('../assets/movie2.jpg'),
  require('../assets/movie3.jpg'),
  require('../assets/movie4.jpg'),
];

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;


/**
 * Utilizando a biblioteca react-spring
 * Anime o componente Post para que ele desapareça assim que essa tela for construida.
 * Leve a opacidade dele de 1 para 0 em 3 segundos.
 */

const Home = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster source={require('../assets/poster.jpg')}>
          <Header />
          <Hero />
        </Poster>
        <Movies label="Recomendados" item={api} />
        <Movies label="Top 10" item={api} />
      </Container>
    </>
  );
};

export default Home;
