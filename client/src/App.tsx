import React from 'react';
import NavBar from './Feature/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Feature/Main';
import Login from './Feature/Login';
import Search from './Feature/Search';
import RequireAuthComponent from './Components/RequireAuth'
import Latest from './Feature/Latest';
import Watch from './Feature/Watch';
import { useAuth } from './Context/authContext';

const App : React.FC =  () =>  {
  const { currentUser } = useAuth()
  return (
    <div className='w-screen h-auto flex flex-col bg-white'>
      <NavBar />
      <main className={`${currentUser?.email ? 'mt-44' : 'mt-12'}`}>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<RequireAuthComponent><Search /></RequireAuthComponent>}></Route>
          <Route path='/latest' element={<RequireAuthComponent><Latest /></RequireAuthComponent>}></Route>
          <Route path='/watch' element={<RequireAuthComponent><Watch /></RequireAuthComponent>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
