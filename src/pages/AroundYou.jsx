import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryCodeQuery } from "../redux/services/ShazamCore";

const CountryTracks = () => {
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});

	const [data, isFetching, error] = useGetSongByCountryCodeQuery(country);

	useEffect(() => {
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=at_d4IV2PWWitWZZr3Z8HZY41lwTNv35`
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading) return <Loader title='Loading song round you' />;

	if (error && country)
		return <Error title="Ooops, i can't find any song around you" />;

	return (
		<div>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>
				Around you <span className='font-black'>{country}</span>{" "}
			</h2>

			{data?.map((song, i) => (
				<SongCard
					key={song.key}
					data={data}
					isPlaying={isPlaying}
					activeSong={activeSong}
					song={song}
					i={i}
				/>
			))}
		</div>
	);
};
export default CountryTracks;
