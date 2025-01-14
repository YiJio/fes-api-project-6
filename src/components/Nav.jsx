// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro', 'fmetro'];

const Nav = ({ currentPage, lines, stations }) => {
	// hooks
	const navigate = useNavigate();

	const goToRandomLine = () => {
		let max = lines.length - 1;
		let min = 0;
		let random = -1;
		do {
			random = Math.round(Math.random() * (max - min) + min);
		} while (!SHOW_SERVICES.includes(lines[random]._service_id));
		navigate(`/line/${lines[random]._id}`);
	}

	const goToRandomStation = () => {
		let max = stations.length - 1;
		let min = 0;
		let random = -1;
		do {
			random = Math.round(Math.random() * (max - min) + min);
		} while (!SHOW_SERVICES.includes(stations[random]._service_id));
		navigate(`/station/${stations[random]._id}`);
	}
	
	if(!lines || !stations) { return <>Loading...</>; }

	return (
		<nav className='c-nav'>
			{currentPage !== 'home' && <Link to='/home' className='c-nav__item'>Home</Link>}
			{currentPage !== 'credits' && <Link to='/credits' className='c-nav__item'>Credits</Link>}
			{currentPage !== 'search' && <Link to='/search' className='c-nav__item'>Search</Link>}
			<div className='c-nav__item' onClick={goToRandomLine}>Random line</div>
			<div className='c-nav__item' onClick={goToRandomStation}>Random station</div>
		</nav>
	);
}

export default Nav;