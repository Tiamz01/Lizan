import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongbySearchQuery } from "../redux/services/ShazamCore";

const Search = () => {
	const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});

	const { data, isFetching, error } = useGetSongbySearchQuery(searchTerm);

	if (isFetching) return <Loader title='Searching songs...' />;

	if (error) return <Error />;

	// Transform Deezer API response to match expected format
	const transformedData = data?.data || data?.tracks?.data || data || [];

	return (
		<div>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>
				Showing results for <span className='font-black'>{searchTerm}</span>
			</h2>

			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{Array.isArray(transformedData) && transformedData.map((song, i) => {
					// Transform song data to match expected format
					const transformedSong = {
						...song,
						key: song.id,
						title: song.title || song.name || "Unknown Title",
						subtitle: song.artist?.name || song.artist?.title || "Unknown Artist",
						images: {
							coverart: song.album?.cover_medium || song.album?.cover || song.album?.image || song.artist?.picture_medium || song.artist?.image || "https://via.placeholder.com/250"
						},
						// Include the preview URL for audio playback
						preview: song.preview,
						artists: song.artist ? [{ adamid: song.artist.id }] : []
					};
					
					return (
						<SongCard
							key={song.id || i}
							data={transformedData}
							isPlaying={isPlaying}
							activeSong={activeSong}
							song={transformedSong}
							i={i}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default Search;