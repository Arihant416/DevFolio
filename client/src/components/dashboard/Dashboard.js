import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
// import Spinner from '../layouts/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
const Dashboard = ({
	getCurrentProfile,
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
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
