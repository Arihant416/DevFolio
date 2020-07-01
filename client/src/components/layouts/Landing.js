import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>The DevFolio </h1>
					<p className='lead'>
						Create a developer's portfolio, share posts and get to know other
						developers.
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
					<p className='text-muted pa'>
						Copyright ©
						<a
							href='https://www.github.com/Arihant416'
							target='_blank'
							rel='noopener noreferrer'
						>
							{` `} Arihant
						</a>{' '}
						2020 <span className='red'>❤</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Landing;
