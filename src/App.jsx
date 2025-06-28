import './App.scss';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { createBrowserRouter, RouterProvider, Route, Routes, Link  } from 'react-router-dom';
import { PrescriptionPage } from './pages/PrescriptonPage';
import { PatientRegistrationPage } from './pages/PatientRegistrationPage';
import { useEffect, useState } from 'react';
import { RegisterUser } from './pages/RegisterUserPage';

function App() {

const [loggedInUser, setLoggedInUser] = useState('');

useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', setLoggedInUser);
    }
  }, [loggedInUser]);

  const router =createBrowserRouter([
    {
      path: '/',
      element: <LoginPage setLoggedInUser={setLoggedInUser}/>
    },
    {
      path: '/home',
      element: <HomePage loggedInUser={loggedInUser}/>
    },
    {
      path: '/addprescription',
      element:< PrescriptionPage  loggedInUser={loggedInUser}/>
    },
    {
      path: '/patietnregistration',
      element:< PatientRegistrationPage loggedInUser={loggedInUser}/>
    },
        {
      path: '/RegisterUser',
      element:< RegisterUser loggedInUser={loggedInUser}/>
    },



    
  ])

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
