import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongbySearchQuery } from "../redux/services/ShazamCore";

const Search = () => {
	const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});

	const [data, isFetching, error] = useGetSongbySearchQuery(searchTerm);

	const songs = data?.tracks?.hits?.maps((song) => song.track);
	if (isFetching && loading) return <Loader title='Loading top charts' />;

	if (error && country) return <Error />;

	return (
		<div>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>
				Showing results for <span className='font-black'>{searchTerm}</span>
			</h2>

			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{songs?.map((song, i) => (
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
		</div>
	);
};
export default Search;
