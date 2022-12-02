import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/ShazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying, genreListId } = useSelector(
		(state) => state.player
	);
	const { data, isFetching, error } = useGetSongsByGenreQuery(
		genreListId || "POP"
	);

	if (isFetching) return <Loader title='Loading songs....' />;

	if (error) return <Error />;

	const genreTitle = genre.find(({ value }) => value === genreListId)?.title;
	return (
		<div className='flex flex-col'>
			<div className='w-full flex justify-between items-center flex-col sm:flex-row mt-4 mb-10'>
				<h2 className='font-bold text-3xl text-white text-left capitalize'>
					discover {genreTitle}
				</h2>
				<select
					className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 '
					value={genreListId || "pop"}
					onChange={(e) => {
						dispatch(selectGenreListId(e.target.value));
					}}
				>
					{genres.map((genre) => {
						return (
							<option
								key={genre.value}
								value={genre.value}
							>
								{genre.title}
							</option>
						);
					})}
				</select>
			</div>
			<div className='flex flex-wrap justify-center sm:justify-start flex-1 gap-8'>
				{data?.map((song, i) => {
					return (
						<SongCard
							song={song}
							isPlaying={isPlaying}
							activeSong={activeSong}
							key={song.key}
							data={data}
							i={i}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Discover;
