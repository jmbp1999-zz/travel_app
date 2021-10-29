import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const signIn = (formData,history)=>async (dispatch)=>{
    try{
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH,data});
        //log in the user...
        // why history  ? we have to navigate to the home page
        history.push('/');
    }catch(error){
        console.log(error);
    }
}


export const signUp = (formData,history)=>async (dispatch)=>{
    try{
        const {data} = await api.signUp(formData);
        dispatch({type:AUTH,data});
        history.push('/')
        //Sign Up in the user...
        // why history  ? we have to navigate to the home page
    }catch(error){
        console.log(error);
    }
}

