import React, { useEffect, useState } from 'react'
import Post from './Post'
import Cookies from 'js-cookie'

const Homepage = () => {
  const [posts,setPosts]=useState({})

  const baseUrl=process.env.REACT_APP_API_URL;
  const token = Cookies.get('token')
  
  useEffect(()=>{
    fetch(`${baseUrl}/post`, {
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // }
    }).then(res=>{
      res.json().then(posts=>{
        setPosts(posts)
      })
    })
  },[])
  return (
        <div style={{marginBottom:'5px'}}>
        {posts.length>0 && posts.map(post=>
          <Post {...post}/>
        )}
        </div>
  )
}

export default Homepage