import React from 'react';

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
						<a href='register.html' className='btn btn-primary'>
							Sign Up
						</a>
						<a href='login.html' className='btn btn-light'>
							Login
						</a>
					</div>
					<p className='text-muted pa'>
						Copyright ©
						<a href='https://www.github.com/Arihant416' target='_blank'>
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
