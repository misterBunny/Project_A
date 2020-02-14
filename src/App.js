import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import './App.css';
import LoginForm from './components/login-form.component'
import SignupForm from './components/sign-up-form.component';
//import Navbar from './components/infoPage.component'

class App extends React.Component{
  constructor(){
    super()

    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth= null

  componentDidMount() {
    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state)
        })
      }
      else {
        this.setState({currentUser: userAuth})
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
  return (
    <Switch>
      <Route to='/login' component={LoginForm} />
      {/* <Route to='/signup' component={SignupForm} /> */}
      {/* <Route exact to='/info' component={Navbar} /> */}
    </Switch>
   
    //<SignupForm />
    
  );
}
}

export default App;
