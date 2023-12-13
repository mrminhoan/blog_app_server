import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './SinglePost.css'
import { Context } from '../../Context/Context'
import { axiosInstance } from '../../config'

export default function SinglePost() {
    const PF = process.env.REACT_APP_TEST_PF_URL
    const location = useLocation()
    const [post, setPost] = useState({})

    const path = location.pathname.split("/")[2]
    const path1 = path.split(":")[1]
    const { user } = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + path1)
            const data = res.data
            setPost(data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path1])
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/posts/${post._id}`,
                { data: { username: user.username } }

            )
            window.location.replace("/")
        } catch (error) {

        }
    }

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`posts/${post._id}`,
                {
                    username: user.username,
                    title: title,
                    desc: desc
                })
            setUpdateMode(false)
        } catch (error) {

        }
    }
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        className='singlePostImg'
                        src={PF + post.photo}
                        alt=""
                    />
                )}
                {updateMode ? <input type="text" value={title} className='singlePostTitleInput' autoFocus onChange={(e) => setTitle(e.target.value)} /> :
                    (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <i className=" singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                    <i className=" singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <Link to={`/?user=${post.username}`} className='link'>
                        <span className='singlePostAuthor'> Author: <b>{post.username}</b></span>
                    </Link>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                
                {updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e) => setDesc(e.target.value)} /> : (
                    <p className='singlePostDesc'>{desc}</p>
                )}

                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    )
}
