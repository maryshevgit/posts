import React, { useState } from 'react'

import MyName from "../name/MyName";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({create}) => {
  const [post, setPost] = useState({title:'', body: ''})

  function addNewPost(e) {
    e.preventDefault()
    const newPost = {
      ...post, id:Date.now()
    }
    create(newPost)
    setPost({title:'', body: ''})
  }

  return (
    <div>
      <form>
      <MyName name={'Andrey Maryshev'} />
       <MyInput
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          placeholder='Поиск по названию' 
          type='text'
       />
       <MyInput 
          placeholder='Поиск по описанию' 
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type='text'
       />
       <MyButton onClick={addNewPost}>
          Создать пост
        </MyButton>
      </form>
    </div>
  )
}

export default PostForm