import {v1 as uuid} from 'uuid';
import {SET_ALERT,REMOVE_ALERT} from './types';

export const setAlert = (msg,alertTypes)=>dispatch=>{
    const id = uuid;
    dispatch({
        type:SET_ALERT,
        payload:{
            msg,alertTypes,id
        }
    });

    setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),5000);
}