import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import {auth, createUserProfileDocument} from '../firebase/firebase.utils'
import logo from '../assets/logo.png'

import './logn-form.styles.css'

class SignupForm extends React.Component{
    constructor(){
        super()

        this.state= {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    onChange= event =>{
        const {name, value}= event.target;
        this.setState({[name]: value})
    }

    onSubmit= async (event) =>{
        event.preventDefault();

        const {displayName, email, password, confirmPassword}= this.state

        if(password !== confirmPassword){
            alert("Passwords Don't Match")
            return
        }

        try {
            const {user}= await auth.createUserWithEmailAndPassword(
                email,
                password
            )
            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    render(){
        return(
            <div className='supermain'>
                <div className="main">
                    <div className="main-signup">
                        <div className='sidebar-signup'>
                        <h5 style={{fontSize:'20px', fontWeight:'bold' }}>Don't have an account!!</h5>
                        <p style={{textAlign: 'center', fontWeight: 'bold'}}>Sign Up Here</p>
                        </div>

                <Form onSubmit={this.handleSubmit} style={{display:'flex', justifyContent:'space-around', flexDirection:'column'}}>
                    <img src={logo} alt='logo' style={{color:'blue'}}/>

                <span>
                <FormGroup>
                    <Input
                    onChange={this.handleChange} 
                    className="mb-1" 
                    type='displayName' 
                    name='displayName'
                    placeholder='Enter Name' 
                    required />

                    <Input 
                    onChange={this.handleChange} 
                    className="mb-1" 
                    type='email'
                    name='email' 
                    placeholder='Enter email' 
                    required />

                    <Input 
                    onChange={this.handleChange} 
                    className="mb-1" 
                    type='password'
                    name='password' 
                    placeholder='Enter Password' 
                    required />

                    <Input 
                    onChange={this.handleChange} 
                    className="mb-1" 
                    type='password'
                    name='confirmPassword' 
                    placeholder='Confirm Password' 
                    required />

                </FormGroup>

                <Button 
                    className='google-button p-1 text-center' 
                    style={{width:'100%',backgroundColor:'#120f5d', fontWeight: 'bold'}}>
                    SignUp
                </Button>
                </span>
                </Form>

                </div>
                </div>

                <footer 
                    style={{color: 'white'}}>
                    CopyRight © 2019 Trade and affiliates. All rights reserved. 
                </footer>

            </div>
        )
    }
}
export default SignupForm