import SongBar from "./SongBar";

const RelatedSongs = ({
	data,
	isPlaying,
	activeSong,
	handlePauseClick,
	handlePlayClick
}) => (
	<div className='flex flex-col'>
		<h1 className='text-3xl text-white , font-bold capitalize'>
			related songs:
		</h1>

		<div className='mt-6 w-full flex flex-col'>
			{data?.map((song, i) => {
				// Transform song data to match expected format
				const transformedSong = {
					...song,
					key: song.id,
					title: song.title || song.name,
					subtitle: song.artist?.name || "Unknown Artist",
					images: {
						coverart: song.album?.cover_medium || song.album?.cover || song.artist?.picture_medium || "https://via.placeholder.com/125"
					},
					// Include the preview URL for audio playback
					preview: song.preview,
					artists: song.artist ? [{ adamid: song.artist.id }] : []
				};
				
				return (
					<SongBar
						key={`${song.id}-${i}`}
						i={i}
						artistId={song.artist?.id}
						isPlaying={isPlaying}
						song={transformedSong}
						handlePauseClick={handlePauseClick}
						handlePlayClick={handlePlayClick}
					/>
				);
			})}
		</div>
	</div>
);

export default RelatedSongs;