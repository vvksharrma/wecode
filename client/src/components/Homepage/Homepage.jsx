import React, { useEffect, useState } from 'react'
import Post from './Post'

const Homepage = () => {

  const [posts,setPosts]=useState({})

  useEffect(()=>{
    fetch('http://localhost:4400/post').then(res=>{
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