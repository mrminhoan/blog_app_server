import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Components/header/Header'
import Posts from '../../Components/posts/Posts'
import Sidebar from '../../Components/sidebar/Sidebar'
import './Home.css'
import { axiosInstance } from '../../config'
import axios from 'axios'
export default function Home() {
    const [posts, setPosts] = useState([])
    const {search} = useLocation()

    useEffect( () =>{
        const fecthPosts = async () =>{
            const res = await axiosInstance.get("posts"+search)
            setPosts(res.data)
        }
        fecthPosts()
    }, [search])
    return (
        <>
        <Header />
        <div className='home'> 
            <Posts posts={posts}  />
            <Sidebar />
        </div>
        </>
    )
}
