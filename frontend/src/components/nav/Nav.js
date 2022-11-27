import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './nav.css'

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <div>
            <img src='https://th.bing.com/th/id/R.7d12d9766d466dc0b798b6c2e6126389?rik=SDjS1Z2Qwyx7fg&riu=http%3a%2f%2fwww.creativecompulsions.com%2fblog%2fwp-content%2fuploads%2f2014%2f01%2fV-Logo.jpg&ehk=rABKeb5B3JpEgTRy0%2fUwvsBOl7EV69aWUTuYLx6nslo%3d&risl=&pid=ImgRaw&r=0' className='logo' alt=''/>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }

        </div>
    )
}

export default Nav;