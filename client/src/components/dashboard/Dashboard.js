import React, {useEffect,Fragment} from 'react';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile,auth:{user,},profile:{profile,loading}}) =>{
    useEffect(()=>{
        getCurrentProfile();
    },
    []
    );
    return loading && profile == null?(<Spinner/> ):
    (
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'><i className='fas fa-user'/> Welcome {user && user.name}</p>
    {profile!==null ? (
        <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
        </Fragment>
    ):(<Fragment>
        <p>You have not set up your profile. Please add more information.</p>
        <Link to ='create-profile' className='btn btn-primary my-1'>Create Profile </Link>
    </Fragment>)}
    </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile,
        auth:state.auth
    }
}
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);