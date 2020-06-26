import React, {useState, useEffect} from 'react'

import { StatusBar, Dimensions } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import styled from 'styled-components/native'

import {animated, useSpring} from 'react-spring'

import {GetLocation, FilterByCountry} from '../services/movieFilter';

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'

const api = [
	require('../assets/movies/movie1.jpg'),
	require('../assets/movies/movie2.jpg'),
	require('../assets/movies/movie3.jpg'),
	require('../assets/movies/movie4.jpg'),
	require('../assets/movies/movie5.jpg'),
]

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 100%;
`

const AnimatedPoster = animated(Poster);

const Home = () => {
	const propsPoster = useSpring({config: { duration: 3000 }, to: {opacity: 1}, from: {opacity: 0}});

	const [movies, setMovies] = useState([]);
	const [nationalMovies, setNationalMovies] = useState([]);

	useEffect(async () => {
		const moviesJson = require('../assets/movies.json');
		const position = await GetLocation();
		const nationalCountries = await FilterByCountry(moviesJson, position);

		setNationalMovies(nationalCountries);
		const nationalCountriesTitles = nationalCountries.map(
			(item, index) => item.Title
		);
		const moviesInternationals = moviesJson.filter((item, index) => {
			return !nationalCountriesTitles.includes(item.Title);
		});
		setMovies(moviesInternationals);
		//loadingMovies();
		//Aula 04/06 => 02:19
	},[]);

	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>
				<AnimatedPoster style={propsPoster} source={require('../assets/poster.jpg')}>
					<Gradient
						locations={[0, 0.2, 0.6, 0.93]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
						<Header />
						<Hero />
					</Gradient>
				</AnimatedPoster>
				<Movies label='Movies' movieList={movies} />
				<Movies label='Nationals' movieList={nationalMovies} />
			</Container>
		</>
	)
}

export default Home
