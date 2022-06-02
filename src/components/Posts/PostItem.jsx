import React from 'react'
import MyButton from '../UI/button/MyButton'

const PostItem = ({post, number, remove}) => {
  return (
    <div>
        {post.id+"."} {'Название: ' + post.title} {'Описание: ' + post.body} <MyButton onClick={() => remove(post)}>Удалить</MyButton>
    </div> 
  )
}

export default PostItem