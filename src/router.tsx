import { createBrowserRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/chats/:_id',
    element: <Chat />
  }
]);

export default router;
