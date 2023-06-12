import { useState } from 'react';

import { PostDetail } from './PostDetail';
import { useQuery } from '@tanstack/react-query';

const maxPostPage = 10;

async function fetchPosts () {
  const response = await fetch(
    'http://localhost:3000/posts?_limit=10&_page=0',
  );
  return response.json();
}

export function Posts () {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // TODO: 1 use useQuery to fetch the posts
  // TODO: 3 handle loading state
  // TODO: 4 handle error state
  // TODO: 5 use onError callback
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts, staleTime: 6000 });
  if (isLoading) {
    return (<div>Loading...</div>);
  }
  if (isError) {
    return (<div>Error: { error.toString() }</div>);
  }
  return (
    <>
      <ul>
        { data.map((post) => (
          <li
            key={ post.id }
            className='post-title'
            onClick={ () => setSelectedPost(post) }
          >
            { post.title }
          </li>
        )) }
      </ul>
      <div className='pages'>
        <button disabled onClick={ () => {} }>
          Previous page
        </button>
        <span>Page { currentPage + 1 }</span>
        <button disabled onClick={ () => {} }>
          Next page
        </button>
      </div>
      <hr />
      { selectedPost && <PostDetail post={ selectedPost } /> }
    </>
  );
}
