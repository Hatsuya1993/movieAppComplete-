import React from 'react';
import NavBar from './Feature/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Feature/Main';
import Login from './Feature/Login';
import Search from './Feature/Search';
import RequireAuthComponent from './Components/RequireAuth'
import { useAuth } from './Context/authContext';
import ShortVideos from './Feature/ShortVideos';
import Information from './Feature/Information';
import Detail from './Feature/Detail';

const App : React.FC =  () =>  {
  const { currentUser } = useAuth()
  return (
    <div className='w-screen h-auto flex flex-col bg-white'>
      <NavBar />
      <main className={`${currentUser?.email ? 'mt-44' : 'mt-12'} `}>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<RequireAuthComponent><Search /></RequireAuthComponent>}></Route>
          <Route path='/short%20videos' element={<RequireAuthComponent><ShortVideos /></RequireAuthComponent>}></Route>
          <Route path='/information' element={<RequireAuthComponent><Information /></RequireAuthComponent>}></Route>
          <Route path='/detail' element={<RequireAuthComponent><Detail /></RequireAuthComponent>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
