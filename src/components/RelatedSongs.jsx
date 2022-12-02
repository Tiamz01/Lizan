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
			{data?.map((song, i) => (
				<SongBar
					key={`${song.key}-${artistId}`}
					i={i}
					artistId={artistId}
					isPlaying={isPlaying}
					song={song}
					handlePauseClick={handlePauseClick}
					handlePlayClick={handlePlayClick}
				/>
			))}
		</div>
	</div>
);

export default RelatedSongs;
