import React, { useContext, useState } from 'react'
import Sidebar from '../../Components/sidebar/Sidebar'
import { Context } from '../../Context/Context'
import * as actions from "../../Context/Actions"
import './Settings.css'
import { axiosInstance } from '../../config'
import axios from 'axios'
export default function Settings() {
    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const PF = process.env.REACT_APP_TEST_PF_URL
    const handleSubmit =  async (e)=>{
        e.preventDefault()
        
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            password,
            email,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            // console.log(data)
            updatedUser.profilePic = filename
            try {
                await axiosInstance.post("upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const res = await axiosInstance.put("users/" + user._id, updatedUser)
            setSuccess(true)
            // console.log(res.data)
            // console.log(updatedUser)
            dispatch(actions.UpdateSuccess(), res.data)
        } catch (error) {
            dispatch(actions.UpdateFailure())
        }
    }
        

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit} >
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src= { file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="name" onChange={e=> setUsername(e.target.value)}  required/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email" onChange={e=> setEmail(e.target.value)} required/>
                    <label>Password</label>
                    <input type="password"  name="password" onChange={e=> setPassword(e.target.value)} required/>
                    <button className="settingsSubmitButton" type="submit" >
                        Update
                    </button>
                    {success && <span style={{color: "green", marginTop: "20px", textAlign:"center"}}>Profile has updated</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
