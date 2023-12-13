import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import "./Topbar.css"
import * as actions from "../../Context/Actions"
export default function Topbar() {
    const PF = process.env.REACT_APP_TEST_PF_URL
    const { user, dispatch } = useContext(Context)
    const handleLogout = () => {
        dispatch(actions.LOGOUT())
    }
    return (
        <div className='top'>
            <div className="topLeft">
                <i class=" topIcon fab fa-facebook-square"></i>
                <i class=" topIcon fab fa-twitter-square"></i>
                <i class=" topIcon fab fa-pinterest-square"></i>
                <i class=" topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className='topList'>
                    <li className='topListItem' ><Link to="/" className='link' >HOME</Link></li>
                    <li className='topListItem' ><Link to="/" className='link' >CONTACT</Link></li>
                    <li className='topListItem' ><Link to="/" className='link' >ABOUT</Link></li>
                    <li className='topListItem' ><Link to="/write" className='link' >WRITE</Link></li>
                    <li className='topListItem' onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings" >
                            <img
                                className='topImg'
                                src={PF + user.profilePic}
                                alt=""
                            />
                        </Link>
                    ) : (
                        <ul className='topList'>
                            <li className="topListItem">
                                <Link to="/login" className='link' >LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/register" className='link' >REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
                <i class=" topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
