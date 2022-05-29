import React, {useState} from "react";

import styles from './App.module.scss'

import PostForm from "./components/Posts/PostForm";
import PostList from "./components/Posts/PostList";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Hello World', body: 'PHP'},
    {id: 2, title: 'Interesting', body: 'Javascript'},
    {id: 3, title: 'Wonderfull', body: 'React'}
  ])

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  function createPost(newPost) {
    setPosts([...posts, newPost])
  }

  return (
    <div className={styles.wrapper}>
      <PostForm create={createPost} />
      <PostList remove={removePost} posts={posts} title='Список постов'/>
    </div>
  );
}

export default App;
