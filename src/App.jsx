import { Posts } from './Posts';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App () {
  return (
    // TODO: 2 provide React Query client to App
    <div className='App'>
      <h1>Blog Posts</h1>
      <Posts />
    </div>
  );
}

export default App;
