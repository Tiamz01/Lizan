import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/ShazamCore";

const SongDetails = () => {
	const dispatch = useDispatch();
	const { songid } = useParams();
	console.log("this is songid:", songid);
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});
	const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

	const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

	if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title={"Searching song details"} />;

	if (error) return <Error />;

	function handlePauseClick() {
		dispatch(playPause(false));
	}
	function handlePlayClick(song, i) {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	}

	// Transform song data for DetailsHeader
	const transformedSongData = {
		...songData,
		title: songData?.title || songData?.name || "Unknown Title",
		subtitle: songData?.artist?.name || songData?.artist?.title || "Unknown Artist",
		images: {
			coverart: songData?.album?.cover_medium || songData?.album?.cover || songData?.album?.image || songData?.artist?.picture_medium || songData?.artist?.image || "https://via.placeholder.com/250"
		},
		// Include the preview URL for audio playback
		preview: songData?.preview,
		artists: songData?.artist ? [{ adamid: songData.artist.id }] : [],
		// For lyrics, we'll provide a default message since Deezer API doesn't provide lyrics
		sections: [{
			type: "INFO",
			text: ["Track information provided by Deezer API"]
		}, {
			type: "LYRICS",
			text: ["Lyrics are not available through the Deezer API in this implementation.", "Please check the official artist or song page for lyrics."]
		}]
	};

	// Transform related songs data
	const transformedRelatedData = data?.data || data || [];

	return (
		<div className='flex flex-col'>
			<DetailsHeader
				artistId=''
				songData={transformedSongData}
			/>
			<div className='mb-10'>
				<h2 className='text-white text-3xl font-bold capitalize'>Track Information:</h2>
				<div className='mt-5'>
					{transformedSongData?.sections[1].type === "LYRICS" ? 
						transformedSongData?.sections[1].text.map((line, i) => <p key={i} className='text-gray-400 text-base my-1'>{line}</p>) : 
						<p className='text-gray-400 text-base my-1'>Track information provided by Deezer API</p>
					}
				</div>
			</div>
			<RelatedSongs
				data={Array.isArray(transformedRelatedData) ? transformedRelatedData : []}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};

export default SongDetails;