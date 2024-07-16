import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Registration from './Components/registration/Registration'
import Login from './Components/login/Login'
import ForgotPassword from './Components/forgotPassword/ForgotPassword';
import Home from './Components/home/Home';
import MyProfile from './Components/myProfile/MyProfile';
import firebaseConfig from './config/FirebaseConfig';
import store from './store/Store'
import { Provider } from 'react-redux';
import User from './Components/user/User';
import Friends from './Components/friends/Friends';
import Request from './Components/Request/Request';
import PostFeed from './Components/post/PostFeed';
import Blocklist from './Components/blocklist/Blocklist';
import Message from './Components/message/Message';
import MyGroup from './Components/myGroup/MyGroup';
import GroupList from './Components/groupList/GroupList';
import Messenger from './Components/messenger/Messenger';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/myprofile",
    element: <MyProfile />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <PostFeed />,
      },
      {
        path: "/request",
        element: <Request />,
      },
      {
        path: "/friends",
        element: <Friends />,
      }, {
        path: "/blocklist",
        element: <Blocklist />
      },
      {
        path: "/mygroup",
        element: <MyGroup />
      },
      {
        path: "/grouplist",
        element: <GroupList />
      },
      {
        path: "/messenger",
        element: <Messenger />
      },
       {
        path: "/message",
        element: <Message />
      },
      {
        path: "/user",
        element: <User />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
