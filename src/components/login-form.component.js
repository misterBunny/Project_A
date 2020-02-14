import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons'
import {auth, signInWithFacebook, signInWithGoogle} from '../firebase/firebase.utils'
import logo from '../assets/logo.png'

import './logn-form.styles.css'


class LoginForm extends React.Component{
    constructor(props){
        super(props)

        this.state= {
            email: '',
            password: ''
        }
    }

    handleSubmit= async event => {
        event.preventDefault();
        const {email, password}= this.state
        
        try{
        await auth.signInWithEmailAndPassword(email, password)
        this.setState({email: '', password: ''})
        } catch(err){
            console.log(err)
        }
    }

    handleChange= event => {
        const {name, value}= event.target
        this.setState({[name]: value})
    }

    render(){
        const {email, password}= this.state
        return(
            <div className='supermain'>
            <div className="main">
                <div className="main-signup">
                <div className='sidebar-signup'>
                    <h3 style={{fontSize:'23px', fontWeight:'bold' }}>Welcome to Trade</h3>
                    <span>
                    <p>Login to see our Trade</p>
                    <p>Platform in Action</p>
                    </span>
                    <h5 style={{fontSize:'13px', fontWeight:"normal"}}><b>Forgot Password?</b></h5>
                </div>
            <Form onSubmit={this.handleSubmit} style={{display:'flex', justifyContent:'space-around', flexDirection:'column'}}>
            <img src={logo} alt='logo' style={{color:'blue'}}/>

            <span>
                <FormGroup>
                    
                    <Input 
                    className="mb-1" 
                    type='email' 
                    name='email' 
                    value={email} 
                    onChange={this.handleChange} 
                    placeholder='Enter Your Email' 
                    required />
                    
                    <Input 
                    type='password' 
                    name='password' 
                    value={password} 
                    onChange={this.handleChange} 
                    placeholder='Enter Your Password' 
                    required />

                </FormGroup>

                <Button 
                className='google-button p-1 text-center' 
                type='submit' 
                style={{width:'100%',backgroundColor:'#120f5d', fontWeight: 'bold'}}>
                Login
                </Button>
                <div className='text-center pt-3'>
                    Or continue with your social account
                </div>
                </span>
                <span>          
                    <FacebookLoginButton 
                    className='google-button text-center' 
                    onClick={signInWithFacebook} />

                    <GoogleLoginButton
                    className='google-button' 
                    onClick={signInWithGoogle} />
                </span>      
                </Form>
            </div>
            </div>
            <footer style={{color: 'white'}}>CopyRight © 2019 Trade and affiliates. All rights reserved. </footer>
            </div>
        )
    }
}
export default LoginForm