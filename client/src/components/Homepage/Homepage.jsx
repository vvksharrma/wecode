import React, { useEffect, useState } from 'react'
import Post from './Post'

const Homepage = () => {
  const [posts,setPosts]=useState({})

  const baseUrl=process.env.REACT_APP_API_URL;
  console.log(baseUrl);

  useEffect(()=>{
    fetch(`${baseUrl}/post`).then(res=>{
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