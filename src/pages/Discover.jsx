import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/ShazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");

	if (isFetching) return <Loader title='Loading songs....' />;

	if (error) return <Error />;

	// Transform Deezer API response to match expected format
	// Handle different response formats
	const transformedData = data?.data || data?.tracks?.data || data || [];

	// Find the selected genre title
	const selectedGenre = genres.find(({ value }) => value === genreListId);
	const genreTitle = selectedGenre ? selectedGenre.title : 'Pop';
	
	return (
		<div className='flex flex-col'>
			<div className='w-full flex justify-between items-center flex-col sm:flex-row mt-4 mb-10'>
				<h2 className='font-bold text-3xl text-white text-left'>
					Discover <span className='capitalize'>{genreTitle}</span> Songs
				</h2>
				<select
					className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer'
					value={genreListId || "POP"}
					onChange={(e) => {
						dispatch(selectGenreListId(e.target.value));
					}}
				>
					{genres.map((genre) => (
						<option
							key={genre.value}
							value={genre.value}
						>
							{genre.title}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-wrap justify-center sm:justify-start flex-1 gap-8'>
				{Array.isArray(transformedData) && transformedData.length > 0 ? (
					transformedData.map((song, i) => {
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
								song={transformedSong}
								isPlaying={isPlaying}
								activeSong={activeSong}
								key={song.id || i}
								data={transformedData}
								i={i}
							/>
						);
					})
				) : (
					<div className="w-full flex flex-col items-center justify-center">
						<p className="text-white text-lg">No songs available for this genre</p>
						<p className="text-gray-400 mt-2">Try selecting a different genre</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Discover;