import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Podcast from './routes/PodcastPage';
import ErrorPage from './routes/ErrorPage';
import Search from './routes/SearchPage';
import RootLayout from './routes/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Search />,
        id: 'root'
      },
      {
        path: '/podcasts/:podcastId',
        element: <Podcast />,
        id: 'search'
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;