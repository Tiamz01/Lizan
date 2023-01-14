import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = (handleClick) => {
	return (
		<div className='mt-10'>
			{links.map((link) => (
				<NavLink
					key={link.name}
					to={link.to}
					className='flex flex-row justify-start items-center font-medium my-8 text-sm text-gray-400 hover:text-cyan-400'
					onClick={() => handleClick && handleClick()}
				>
					<link.icon
						className='w-6
						h-6
						mr-2'
					/>
					{link.name}
				</NavLink>
			))}
		</div>
	);
};

const Sidebar = () => {
	const [mobileMenuDisplay, setMobileMenuDisplay] = useState(false);

	return (
		<>
			<div className='md:flex hidden flex-col w-[240px]py-10 px-4 bg-[#191624]'>
				<h3>Lizan</h3>

				<NavLinks />
			</div>
			<div className='absolute md:hidden block top-6 right-3'>
				{mobileMenuDisplay ? (
					<RiCloseLine
						className='w-6 h-6 text-white mr-2'
						onClick={() => setMobileMenuDisplay(false)}
					/>
				) : (
					<HiOutlineMenu
						className='w-6 h-6 text-white mr-2'
						onClick={() => setMobileMenuDisplay(true)}
					/>
				)}
			</div>

			<div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-whitr/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transititon ${mobileMenuDisplay ? "left-0" : "-left-full"}`}>
				<img
					src={logo}
					alt='logo'
					className='w-full h-10 object-contain mt-4'
				/>
				<NavLinks handleClick={() => setMobileMenuDisplay(false)} />
			</div>
		</>
	);
};

export default Sidebar;
