import React from 'react'
import PostItem from './PostItem'
import styles from './PostList.module.scss'


const PostList = ({title, posts, remove}) => {
  if(!posts.length) {
    return(
      <h1>Посты не найдены</h1>
    )
  }

  return (
    <div>
        <h1>{title}</h1>
        <div className={styles.list}>
          {posts.map((post, index) => 
                <PostItem remove={remove} post={post} number={index + 1}  />
          )}
        </div>
    </div>
  )
}

export default PostList