import Cookies from "js-cookie";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from 'react-router-dom'


  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
}
const formats = [
  'font','size',
  'bold','italic','underline','strike',
  'color','background',
  'script',
  'header','blockquote','code-block',
  'indent','list',
  'direction','align',
  'link','image','video','formula',
]
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles]=useState('')
  const [redirect,setRedirect]=useState(false)

  const baseUrl=process.env.REACT_APP_API_URL
  const token = Cookies.get('token')


  async function handleSubmit(e){
    e.preventDefault();
    const data=new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('files',files[0])
    const response=await fetch(`${baseUrl}/createpost`,{
      method:'POST',
      body:data,
      credentials:'include',
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // },
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    if(response){
          setRedirect(true)
  }
  }
  if(redirect){
    return <Navigate to={'/'}/>
}
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder=" Post Title"
      />
      <input
        type="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder=" Summary"
      />
      <input type="file" onChange={e=>setFiles(e.target.files)}/>

      <ReactQuill value={content} onChange={newValue=>setContent(newValue)} theme="snow" modules={modules} formats={formats} />

      <button style={{ marginTop: "5px" }}>Create Post</button>
      <button onClick={()=>setRedirect(true)} style={{marginTop:'5px',background:'transparent',color:'#333',border:'1px solid'}}>Cancel</button>
    </form>
  );
};

export default CreatePost;
