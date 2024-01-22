import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { Navigate, useParams } from 'react-router-dom'

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

const EditBlog = () => {
    const {id}=useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files,setFiles]=useState('')
    const [redirect,setRedirect]=useState(false)
  
    useEffect(() => {
        fetch(`http://localhost:4400/post/${id}`).then((res) => {
          res.json().then((post) => {
            setTitle(post.title);
            setSummary(post.summary);
            setContent(post.content);
          });
        });
      }, []);

    async function handleUpdate(e){
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        if(files?.[0]){
            data.set('files',files?.[0])
        }
        const response=await fetch(`http://localhost:4400/editpost/${id}`,{
          method:'PUT',
          body:data,
          credentials:'include',
        })
        if(response){
              setRedirect(true)
      }
      }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }
      return (
        <form onSubmit={handleUpdate}>
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
    
          <button style={{ marginTop: "5px" }}>Update Post</button>
          <button onClick={()=>setRedirect(true)} style={{marginTop:'5px',background:'transparent',color:'#333',border:'1px solid'}}>Cancel</button>
        </form>
      );
}

export default EditBlog