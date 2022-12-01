import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
	useGetSongDetailsQuery,
	useGetSongRelatedQuery
} from "../redux/services/Shazam Core";

const SongDetails = () => {
	const dispatch = useDispatch;
	const { songid } = useParams();
	console.log("this is songid:", songid);
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});
	const { data: songData, isFetching: isFetchingSongDetails } =
		useGetSongDetailsQuery({ songid });

	if (isFetchingSongDetails || isFetchingRelatedSongs)
		return <Loader title={"searching song details"} />;

	if (error) return <Error />;

	const {
		data,
		isFetching: isFetchingRelatedSongs,
		error
	} = useGetSongRelatedQuery({ songid });
	return (
		<div className='flex flex-col'>
			<DetailsHeader
				artistId=''
				songData={songData}
			/>
			console.log('this is song data', songData)
			<div className='mb-10'>
				<h2 className='text-white text-3xl font-bold capitalize'>lyrics:</h2>
				<div className='mt-5'>
					{songData?.sections[1].type === "LYRICS" ? (
						songData?.sections[1].text.map((line, i) => (
							<p className='text-gray-400 text-base my-1'>{line}</p>
						))
					) : (
						<p className='text-gray-400 text-base my-1'>
							Sorry, no lyric for this song
						</p>
					)}
				</div>
			</div>
			<RelatedSongs />
		</div>
	);
};

export default SongDetails;
