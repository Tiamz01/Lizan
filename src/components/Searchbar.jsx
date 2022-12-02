import { useState } from "react";
import { useNavigate } from "react-router-dom";
useNavigate;
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		navigate(`/search/${searchTerm}`);
	}
	return (
		<form
			onSubmit={handleSubmit}
			autoComplete='off'
			className='p-2 text-gray-400 focus-within:text-gray-600 '
		>
			<label htmlFor='search-field'>Search all songs</label>
			<div className='flex flex-row justify-start items-center'>
				<FiSearch className='w-5h-5 ml-4' />
				<input
					name='search-field'
					type='search'
					placeholder='Search'
					id='search-field'
					autoComplete='off'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='flex-1 p-4 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white'
				/>
			</div>
		</form>
	);
};

export default Searchbar;
