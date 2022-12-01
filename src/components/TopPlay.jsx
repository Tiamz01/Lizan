import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "../components/PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
	song,
	i,
	isPlaying,
	activeSong,
	handlePauseClick,
	handlePlayClick
}) => {
	return (
		<div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 mb-2 rounded-lg cursor-pointer'>
			<div className='flex flex-1 flex-row justify-between items-center mb-3'>
				<h3 className='font-semibold  text-base text-white mr-3 '>{i + 1}.</h3>
				<img
					src={song?.images?.coverart}
					alt={song?.title}
					className='rounded-lg w-20 h-20'
				/>
				<div className='flex flex-1 flex-col justify-center mx-3'>
					<Link to={`/songs/${song.key}`}>
						<p className='text-bold font-bold text-white'>{song?.title}</p>
					</Link>
					<Link to={`/songs/${song?.artists[0].adamid}`}>
						<p className='text-base text-gray-300'>{song?.subtitle}</p>
					</Link>
				</div>
				<PlayPause
					song={song}
					isPlaying={isPlaying}
					activeSong={activeSong}
					handlePause={handlePauseClick}
					handlePlay={() => handlePlayClick(song, i)}
				/>
			</div>
		</div>
	);
};

const TopPlay = (song, i, handlePauseClick, handlePlayClick) => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => {
		return state.player;
	});

	const { data } = useGetTopChartsQuery();
	const divRef = useRef(null);

	const topPlays = data?.slice(0, 5);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	});

	function handlePauseClick() {
		dispatch(playPause(false));
	}
	function handlePlayClick(song, i) {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	}

	return (
		<div
			ref={divRef}
			className='xl:ml-6 ml-0 xl:mb-0 mb-6  flex flex-col flex-1 xl:max-w-[500px] max-w-full '
		>
			<div className='w-full flex flex-col'>
				<div className='flex flex-row justify-between items-center mt-5'>
					<h2 className='text-white font-bold text-2xl'>Top charts</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'>see more</p>
					</Link>
				</div>

				<div className='flex flex-col gap-1 mt-4'>
					{topPlays?.map((song, i) => {
						return (
							<TopChartCard
								song={song}
								key={song.key}
								i={i}
								isPlaying={isPlaying}
								activeSong={activeSong}
								handlePauseClick={handlePauseClick}
								handlePlayClick={handlePlayClick}
							/>
						);
					})}
				</div>
			</div>
			<div className='w-full flex flex-col mt-8'>
				<div className='flex flex-row justify-between items-center mt-5'>
					<h2 className='text-white font-bold text-2xl'>Top Artists</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'>see more</p>
					</Link>
				</div>
				<Swiper
					slidesPerView='auto'
					spaceBetween={15}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className='mt-4'
				>
					{topPlays?.map((song, i) => (
						<SwiperSlide
							key={song?.key}
							style={{ width: "25%", height: "auto" }}
							className='shadow-lg rounded-full animate-slideright'
						>
							<Link to={`/artists/${song?.artists[0].adamid}`}>
								<img
									src={song?.images.background}
									alt='name'
									className='w-full object-cover rounded-full'
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default TopPlay;
