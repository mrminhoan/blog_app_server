import React, { useContext } from 'react'
import {useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../Context/Context'
import * as actions from "../../Context/Actions"
import './Login.css'
import { axiosInstance } from '../../config'
export default function Login() {
    const userRef = useRef()
    const passRef = useRef()
    const {dispatch, isFetching} = useContext(Context)
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(actions.LoginStart())
        try {
            const res = await axiosInstance.post("auth/login", {
               username: userRef.current.value,
               password: passRef.current.value
            })
            dispatch(actions.LOGINSUCCESS(res.data))
        } catch (error) {
            dispatch(actions.LOGINFAILURE)
        }
    }


    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit} >
                <label>UserName</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Enter your username..."
                    ref = {userRef}
                />
                <label>Password</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Enter your password..."
                    ref = {passRef}
                />
                <button 
                    className="loginButton" 
                    type='submit'
                    disabled = {isFetching}
                >
                    Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link to="/register" className='link'>Register</Link>
            </button>
        </div>
    )
}
