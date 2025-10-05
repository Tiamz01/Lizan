import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
	const dispatch = useDispatch();

	function handlePauseClick() {
		dispatch(playPause(false));
	}
	function handlePlayClick() {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	}
	
	// Handle both old and new image formats
	const imageUrl = song.images?.coverart || 
	                song.album?.cover_medium || 
	                song.album?.cover || 
	                song.artist?.picture_medium || 
	                "https://via.placeholder.com/250";
	
	// Handle both old and new title/subtitle formats
	const title = song.title || song.name || "Unknown Title";
	const subtitle = song.subtitle || song.artist?.name || "Unknown Artist";
	
	// Handle artist link for both formats
	const artistId = song.artists?.[0]?.adamid || song.artist?.id;

	return (
		<div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm  animate-slideup rounded-lg cursor-pointer'>
			<div className='w-full relative h-56 group'>
				<div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === title ? "flex bg-black bg-opacity-70" : "hidden"}`}>
					<PlayPause
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						handlePause={handlePauseClick}
						handlePlay={handlePlayClick}
					/>
				</div>
				<img
					src={imageUrl}
					alt='song_img'
					className='w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='mt-4 flex flex-col'>
				<p className='font-semibold text-lg text-white truncate '>
					<Link to={`/songs/${song.key || song.id}`}>{title}</Link>
				</p>
				<p className='text-sm text-gray-300 mt-1 truncate '>
					<Link to={artistId ? `/artists/${artistId}` : "/top-artists"}>{subtitle}</Link>
				</p>
			</div>
		</div>
	);
};

export default SongCard;