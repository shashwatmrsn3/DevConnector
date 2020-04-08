import React, {useEffect,Fragment} from 'react';
import {connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getAllProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getAllProfiles,profile:{profiles,loading}}) =>{
    useEffect(()=>{
        getAllProfiles();
    },[]);
    return(
        <Fragment>
            {loading? <Spinner/>:<Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i> Browse and connect with Developers

                    </p>
                    <div className='profiles'>
                        {profiles.length>0 ? (
                            profiles.map(profile=>(
                                <ProfileItem key = {profile._id} profile = {profile}/>
                            ))
                        ) : <h4>No Profiles found </h4>}
                    </div>
                </Fragment>}
        </Fragment>
    );


}

const mapStateToProps = (state) =>{
    return{
        profile:state.profile
    }
}
export default connect(mapStateToProps,{getAllProfiles})(Profiles);