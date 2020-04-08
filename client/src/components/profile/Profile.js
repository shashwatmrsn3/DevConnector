import React,{Fragment,useEffect} from 'react';
import {connect } from 'react-redux';
import {getProfileById} from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = ({getProfileById,profile:{profile,loading},auth,match}) =>{
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById]);
    return(<div></div>);
}

const mapStateToProps = (state) =>{
    return{
        profile:state.profile,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{getProfileById})(Profile);