import React from "react";

const Error = ({ title }) => (
	<div className='w-full flex items-center justify-center flex-col'>
		<h1 className='font-bold text-2xl text-white mt-2 text-center'>
			{title || "Something went wrong, please try again"}
		</h1>
		<p className='text-gray-400 mt-2 text-center'>
			If this problem persists, please check your internet connection or try again later.
		</p>
	</div>
);

export default Error;