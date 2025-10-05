import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
	// Handle both old and new data formats
	const artist = artistData?.artists?.[artistId]?.attributes || 
	              (artistData && {
	                name: artistData?.name || "Unknown Artist",
	                artwork: {
	                  url: artistData?.picture_medium || artistData?.picture_big || "https://via.placeholder.com/500"
	                },
	                genreNames: [artistData?.genres?.[0] || "Unknown Genre"]
	              });
	
	const imageUrl = artistId
		? (artist?.artwork?.url?.replace("{w}", "500")?.replace("{h}", "500") || "https://via.placeholder.com/500")
		: (songData?.images?.coverart || 
		   songData?.album?.cover_medium || 
		   songData?.album?.cover || 
		   songData?.artist?.picture_medium || 
		   "https://via.placeholder.com/500");
	
	const title = artistId 
		? (artist?.name || "Unknown Artist") 
		: (songData?.title || songData?.name || "Unknown Title");
	
	const subtitle = artistId 
		? (artist?.genreNames?.[0] || "Unknown Genre") 
		: (songData?.subtitle || songData?.artist?.name || "Unknown Artist");
	
	const artistIdForLink = artistId || songData?.artists?.[0]?.adamid || songData?.artist?.id;

	return (
		<div className='relative w-full flex flex-col'>
			<div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28' />
			<div className='absolute inset-0 flex items-center'>
				<img
					src={imageUrl}
					alt='art'
					className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
				/>

				<div className='ml-5'>
					<p className='font-bold sm:text-3xl text-xl text-white'>
						{title}
					</p>
					{!artistId && artistIdForLink && (
						<Link to={`/artists/${artistIdForLink}`}>
							<p className='text-base text-gray-400 mt-2'>
								{subtitle}
							</p>
						</Link>
					)}

					<p className='text-base text-gray-400 mt-2 '>
						{subtitle}
					</p>
				</div>
			</div>
			<div className='w-full sm:h-44 h-24' />
		</div>
	);
};

export default DetailsHeader;