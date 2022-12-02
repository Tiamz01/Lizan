import { useNavigate } from "react-router-dom";

const ArtistCard = () => {
	const navigate = useNavigate();

	return (
		<div
			className='flex flex-col w-[250px] p-4 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer'
			onClick={() => navigate(`/artist/${track?.artist[0].adamid}`)}
		>
			<img
				src={track?.images?.cover}
				alt='artist'
				className='w-full h-56 rounded-lg'
			/>
			<p className='text-white text-lg font-semibold truncate  '>
				{track?.subtitle}
			</p>
		</div>
	);
};

export default ArtistCard;
