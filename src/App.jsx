import { Posts } from './Posts';
import './App.css';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      console.log('error', error),
  }),
});

function App () {
  return (
    // TODO: 2 provide React Query client to App
    <QueryClientProvider client={ queryClient }>
      <div className='App'>
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools initialIsOpen={ false } />
    </QueryClientProvider>
  );
}

export default App;
