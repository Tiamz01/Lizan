import { loader } from "../assets";

const Loader = ({ title }) => (
	<div className='w-full flex justify-center items-center flex-col'>
		<img
			className='w-[32px] h-[32px] object-contain animate-spin'
			src={loader}
			alt='loader'
		/>
		<h1 className='font-bold text-2xl text-white mt-2'>
			{title || "Loading...."}
		</h1>
	</div>
);

export default Loader;