import React,{Fragment,useState} from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';

const Login = ({login,isAuthenticated})=>{

  const [formData,setFormData] =useState({
   
    email:'',
    password:'',
   
  });

  const {name,email,password,password2} = formData;
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const onSubmit = async e =>{
    e.preventDefault();
    
    login(email,password);
  }
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }
  return (<Fragment>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange = {e=>onChange(e)} />
         
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange = {e=>onChange(e)}
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Don't Have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>);
}

const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,{login})(Login);