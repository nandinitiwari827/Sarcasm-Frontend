import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Register from './components/registration/Register.jsx'
import Login from './components/registration/Login.jsx'
import ChangePassword from './components/registration/ChangePassword.jsx'
import ForgotPassword from './components/registration/ForgotPassword.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'

let router=createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
       {
        path: "about",
        element: <About/>
      },
    ]
  },

    {
      path: "/register",
      element: <Register/>
      },
      {
      path: "/login",
      element: <Login/>
      },
      {
      path: "/forgotPassword",
      element: <ForgotPassword/>
      },
      {
      path: "/changePassword",
      element: (
     <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
       )
     }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="795882224654-1f3jkssg2hrg9svmn8img341mh3eg9jk.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)