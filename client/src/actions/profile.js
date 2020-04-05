import axios from 'axios';
import {setAlert} from './alert';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');
        dispatch({
            type:'GET_PROFILE',
            payload:res.data
        });
    } catch (error) {
        dispatch(
            {
                type:'PROFILE_ERROR',
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            }
        );
    }
} 

export const createProfile = (formData,history,edit=false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('api/profile',formData,config);
        dispatch({
            type:'GET_PROFILE',
            payload:res.data
        });

        dispatch(setAlert(edit? 'Profile updated':'Profile created','success'));

        
            history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:'PROFILE_ERROR',
            payload:{
                msg:err.response.statusText,
                status:err.response.status
            }
        });
    }
}

export const addExperience = (formData,history) =>async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('api/profile/experience',formData,config);
        dispatch({
            type:'UPDATE_PROFILE',
            payload:res.data
        });

        dispatch(setAlert('Experience added','success'));

        
            history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:'PROFILE_ERROR',
            payload:{
                msg:err.response.statusText,
                status:err.response.status
            }
        });
    }
}

export const addEducation = (formData,history) =>  async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('api/profile/education',formData,config);
        dispatch({
            type:'UPDATE_PROFILE',
            payload:res.data
        });

        dispatch(setAlert('Education added added','success'));

        
            history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:'PROFILE_ERROR',
            payload:{
                msg:err.response.statusText,
                status:err.response.status
            }
        });
    }
}