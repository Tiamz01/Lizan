import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logoImproved } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => {
	return (
		<div className='mt-10'>
			{links.map((link) => (
				<NavLink
					key={link.name}
					to={link.to}
					className={({ isActive }) => {
						const classes = 'flex flex-row justify-start items-center font-medium my-8 text-sm';
						if (isActive) {
							return `${classes} text-primary-400 border-r-2 border-primary-400 pr-2`;
						}
						return `${classes} text-gray-400 hover:text-primary-300`;
					}}
					onClick={() => handleClick && handleClick()}
				>
					<link.icon className="w-6 h-6 mr-2" />
					{link.name}
				</NavLink>
			))}
		</div>
	);
};

const Sidebar = () => {
	const [mobileMenuDisplay, setMobileMenuDisplay] = useState(false);
	const navigate = useNavigate();

	const handleLogoClick = () => {
		navigate('/');
	};

	return (
		<>
			<div className='md:flex hidden flex-col w-[180px] py-10 px-4 bg-gradient-to-b from-dark-800 to-dark-900'>
				<img
					src={logoImproved}
					alt='Lizan Logo'
					className='w-full h-16 object-contain mt-4 cursor-pointer'
					onClick={handleLogoClick}
				/>

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

			<div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-dark-800 to-primary-900 backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuDisplay ? "left-0" : "-left-full"}`}>
				<img
					src={logoImproved}
					alt='logo'
					className='w-full h-16 object-contain mt-4 cursor-pointer'
					onClick={handleLogoClick}
				/>
				<NavLinks handleClick={() => setMobileMenuDisplay(false)} />
			</div>
		</>
	);
};

export default Sidebar;