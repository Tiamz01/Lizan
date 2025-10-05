import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/ShazamCore";

const ArtistDetails = () => {
	const { id: artistId } = useParams();

	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});
	const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

	if (isFetchingArtistDetails) return <Loader title={"Searching artist details"} />;

	if (error) return <Error />;

	// Transform artist data for DetailsHeader
	const transformedArtistData = {
		...artistData,
		artists: {
			[artistId]: {
				attributes: {
					name: artistData?.name || "Unknown Artist",
					artwork: {
						url: artistData?.picture_medium?.replace('{w}', '500')?.replace('{h}', '500') || 
							 artistData?.picture_big?.replace('{w}', '500')?.replace('{h}', '500') || 
							 "https://via.placeholder.com/500"
					},
					genreNames: [artistData?.genres?.[0] || "Unknown Genre"]
				}
			}
		}
	};

	// Transform tracks data
	const tracksData = artistData?.tracks?.data || [];

	return (
		<div className='flex flex-col'>
			<DetailsHeader
				artistId={artistId}
				artistData={transformedArtistData}
			/>

			<div className='flex flex-col mt-10'>
				<h1 className='text-3xl text-white font-bold capitalize'>
					related songs:
				</h1>

				<div className='mt-6 w-full flex flex-col'>
					{Array.isArray(tracksData) && tracksData.map((song, i) => {
						// Transform song data to match expected format
						const transformedSong = {
							...song,
							key: song.id,
							title: song.title || song.name || "Unknown Title",
							subtitle: song.artist?.name || song.artist?.title || "Unknown Artist",
							images: {
								coverart: song.album?.cover_medium || song.album?.cover || song.album?.image || song.artist?.picture_medium || song.artist?.image || "https://via.placeholder.com/125"
							},
							// Include the preview URL for audio playback
							preview: song.preview,
							artists: song.artist ? [{ adamid: song.artist.id }] : []
						};
						
						return (
							<div key={`${song.id}-${i}`} className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === transformedSong.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
								<h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
								<div className="flex-1 flex flex-row justify-between items-center">
									<img
										className="w-20 h-20 rounded-lg"
										src={transformedSong.images?.coverart}
										alt={transformedSong.title}
									/>
									<div className="flex-1 flex flex-col justify-center mx-3">
										<p className="text-xl font-bold text-white">
											{transformedSong.title}
										</p>
										<p className="text-base text-gray-300 mt-1">
											{transformedSong.subtitle}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ArtistDetails;