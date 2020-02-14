import React from 'react'
import {Link} from 'react-router-dom'

import './infoPage.styles.css'
import '../App.css'

const Navbar = () => {
    return(
    <div className='origin'>
        <div className='header'>
            <div className='options'>
                <Link className='option' to='subscriptions'>SUBSCRIPTION</Link>
            </div>
        </div>
    </div>
)}
export default Navbar