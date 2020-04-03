import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute  = ({component:Component,auth:{isAuthenticated,loading},...rest}) => (
    <Route {...rest} render={props => {
        if(!isAuthenticated ){
            return <Redirect to='/login'/>;
        } 
        else {
            console.log(isAuthenticated);
            return <Component {...props}/>;
            
        }  
    }}
   />
);

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps =  state  => ({auth:state.auth})    



export default connect(mapStateToProps)(PrivateRoute);