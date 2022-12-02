import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/ShazamCore";

const ArtistDetails = () => {
	const { id: artistId } = useParams();
	console.log("this is songid:", songid);
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});
	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error
	} = useGetArtistDetailsQuery({ artistId });

	if (isFetchingArtistDetails)
		return <Loader title={"searching aritis details"} />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<DetailsHeader
				artistId={artistId}
				artitstData={artistData}
			/>

			<RelatedSongs
				data={Object.values(artistData?.songs)}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
};

export default ArtistDetails;
