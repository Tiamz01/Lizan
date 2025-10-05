import { Error, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";

const TopArtists = () => {
	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading top artists' />;

	if (error) return <Error />;

	// Extract unique artists from tracks
	const artists = [];
	const artistIds = new Set();
	
	if (data) {
		const tracks = data?.data || data?.tracks?.data || data || [];
		if (Array.isArray(tracks)) {
			tracks.forEach(track => {
				if (track.artist && !artistIds.has(track.artist.id)) {
					artistIds.add(track.artist.id);
					artists.push({
						...track.artist,
						key: track.artist.id,
						attributes: {
							name: track.artist.name || track.artist.title || "Unknown Artist",
							artwork: {
								url: track.artist.picture_medium || track.artist.image || "https://via.placeholder.com/250"
							}
						}
					});
				}
			});
		}
	}

	return (
		<div>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>Top Artists</h2>

			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{artists.map((artist) => (
					<div key={artist.key} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
						<div className="w-full h-56">
							<img
								src={artist.attributes?.artwork?.url || "https://via.placeholder.com/250"}
								alt={artist.attributes?.name}
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>
						<div className="mt-4 flex flex-col">
							<p className="font-semibold text-lg text-white truncate">
								{artist.attributes?.name || "Unknown Artist"}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default TopArtists;