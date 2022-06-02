import React, {useEffect, useState} from "react";
import { useFetching } from "./components/hooks/useFetching";
import { getPageCount } from "./utils/pages";

import styles from './App.module.scss'

import PostForm from "./components/Posts/PostForm";
import PostList from "./components/Posts/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyModal from "./components/UI/modal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import PostService from "./components/API/PostService";
import Loader from "./components/UI/loader/Loader";
import { Pagination } from "./components/UI/pagination/Pagination";


function App() {
  const [posts, setPosts] = useState([])
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit,page)
  }, [])

  function getSortedPosts() {
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))   //мутируем копию массива, т.к. напрямую нельзя мутировать
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  function createPost(newPost) {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit,page)
  }

  return (
    <div className={styles.wrapper}>
      <MyButton onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin: '15px 0', width:'100%', backgroundColor:'#4C9EEB', height:'1px'}} />
      <div className={styles.select}>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Поиск...'
        />
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
      {postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{marginTop:'50px'}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedPosts} title='Список постов'/>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
