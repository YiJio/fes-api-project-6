// packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
// assets
import logoGZMTR from '../assets/Guangzhou_Metro_icon.svg';

const Header = () => {
	// states
	const [ui_searchTerm, setUiSearchTerm] = useState('');
	// hooks
	const navigate = useNavigate();

	const handleSearchStation = (e) => {
		e.preventDefault();
		navigate(`/search?q=${encodeURIComponent(ui_searchTerm)}`, { replace: true });
	}

	return (
		<header className='header'>
			<div className='header__wrapper'>
				<Link to='/home' className='header__title'>
					<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ height: '24px' }} />
					Guangzhou Metro
				</Link>
				<div className='header__search'>
					<form onSubmit={handleSearchStation} className='header__search-field'>
						<input className='header__search__input' type='text' value={ui_searchTerm} placeholder='Search a station...' onChange={(e) => setUiSearchTerm(e.target.value)} />
						<button className='header__search__button'><RiSearchLine /></button>
					</form>
				</div>
			</div>
		</header>
	);
}

export default Header;