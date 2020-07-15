import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
// import Spinner from '../layouts/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fa fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button onClick={() => deleteAccount()} className='btn btn-danger'>
							<i className='fas fa-user-minus'></i> Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>Your profile has not been set. Please add profile details</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Set Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
	deleteAccount: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(
	Dashboard
);
