import React, {useState} from "react";

import styles from './App.module.scss'

import PostForm from "./components/Posts/PostForm";
import PostList from "./components/Posts/PostList";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Hello World', body: 'PHP'},
    {id: 2, title: 'Interesting', body: 'Javascript'},
    {id: 3, title: 'Wonderfull', body: 'React'}
  ])
  const [selectedSort, setSelectedSort] = useState('')

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  function createPost(newPost) {
    setPosts([...posts, newPost])
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))   //мутируем копию массива, т.к. напрямую нельзя мутировать
  }

  return (
    <div className={styles.wrapper}>
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0', width:'100%', backgroundColor:'#4C9EEB', height:'1px'}} />
      <div className={styles.select}>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка'
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title='Список постов'/>
        : <h1>Посты не найдены</h1>
      }
    </div>
  );
}

export default App;
