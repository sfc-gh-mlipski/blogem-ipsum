import { useQuery, useMutation } from '@tanstack/react-query';

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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  });
  const deleteMutation = useMutation({ mutationFn: () => deletePost(post.id) });

  if (isLoading) {
    return (<div>Loading...</div>);
  }
  if (isError) {
    return (<div>Error: { error.toString() }</div>);
  }
  return (
    <>
      <h3 style={ { color: 'blue' } }>{ post.title }</h3>
      <button onClick={deleteMutation.mutate}>Delete</button>
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
