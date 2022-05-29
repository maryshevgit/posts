import React from 'react'
import PostItem from './PostItem'
import styles from './PostList.module.scss'

const PostList = ({title, posts, remove}) => {
  return (
    <div>
        <h1>{title}</h1>
        <div className={styles.list}>
            {posts.map((post, index) => 
                <PostItem remove={remove} post={post} number={index + 1} key={post.id} />
            )}
        </div>
    </div>
  )
}

export default PostList