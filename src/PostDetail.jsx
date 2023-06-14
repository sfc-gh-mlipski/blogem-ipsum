import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchComments (postId) {
  const response = await fetch(
    `http://localhost:3000/comments?postId=${ postId }`,
  );
  return response.json();
}

//TODO 10: mutations
async function deletePost (postId) {
  const response = await fetch(
    `http://localhost:3000/posts/${ postId }`,
    { method: 'DELETE' },
  );
  return response.json();
}

async function updatePost (postId) {
  const response = await fetch(
    `http://localhost:3000/posts/${ postId }`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } },
  );
  return response.json();
}

export function PostDetail ({ post }) {
  //TODO 9: replace with useQuery
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery(['comments', post.id], () => fetchComments(post.id));
  const { mutate } = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (<div>Error: { error.toString() }</div>);
  }

  return (
    <>
      <h3 style={ { color: 'blue' } }>{ post.title }</h3>
      <button onClick={ mutate }>Delete</button>
      <button>Update title</button>
      <p>{ post.body }</p>
      <h4>Comments</h4>
      { data.map((comment) => (
        <li key={ comment.id }>
          { comment.email }: { comment.body }
        </li>
      )) }
    </>
  );
}
