import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";

const TopCharts = () => {
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});

	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading top charts' />;

	if (error) return <Error />;

	return (
		<div>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>Discover top TopCharts</h2>

			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						data={data}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};
export default TopCharts;
