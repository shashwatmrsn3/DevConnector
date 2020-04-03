import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

const Dashboard = ({getCurrentProfile,auth,profile}) =>{
    useEffect(()=>{
        getCurrentProfile();
    },
    []
    );
    return <div>dashboard</div>;
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile,
        auth:state.auth
    }
}
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);