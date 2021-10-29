import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import GoogleLogin from "react-google-login";
import Icon from './Icon'
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signUp,signIn} from "../../actions/auth";

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData,setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
    const handleChange = (e) => {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signUp(formData,history))
        }
        else{
            dispatch(signIn(formData,history))
        }
        console.log(formData);


      /*  setFormData({...formData,[e.target.name]:e.target.value});*/ // this can also be used to get the data.
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type:'AUTH',data:{result,token}});
            history.push('/')
        }catch(error){
            console.log(error)
        }

    }
    const googleFailure = ()=>{
        console.log("Google Sign In was Unsuccessful. Try Again Later")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={(e)=>{setFormData({...formData,firstName: e.target.value})}} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={(e)=>{setFormData({...formData,lastName: e.target.value})}} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={(e)=>{setFormData({...formData,email: e.target.value})}} type="email" />
                        <Input name="password" label="Password" handleChange={(e)=>{setFormData({...formData,password: e.target.value})}} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={(e)=>{setFormData({...formData,confirmPassword: e.target.value})}} type="password" /> }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId=""
                        render={(renderProps)=>(
                            <Button
                                className={classes.googleButton}
                                color="secondary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"
                            > Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'

                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
