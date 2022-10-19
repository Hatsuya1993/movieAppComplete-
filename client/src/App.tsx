import React from 'react';
import NavBar from './Feature/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Feature/Main';
import Login from './Feature/Login';
import Search from './Feature/Search';
import RequireAuthComponent from './Components/RequireAuth'
import ShortVideos from './Feature/ShortVideos';
import Information from './Feature/Information';
import Detail from './Feature/Detail';
import ListShowVideos from './Feature/ListShowVideos';
import { useStateValue } from './Redux/StateProvider';
import MyShows from './Feature/MyShows';

const App : React.FC =  () =>  {
  const [{user}, dispatch] = useStateValue()
  return (
    <div className='w-screen h-auto flex flex-col bg-white'>
      <NavBar />
      <main className={`${user ? 'mt-40' : 'mt-12'} `}>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<RequireAuthComponent><Search /></RequireAuthComponent>}></Route>
          <Route path='/short%20videos' element={<RequireAuthComponent><ShortVideos /></RequireAuthComponent>}></Route>
          <Route path='/information' element={<RequireAuthComponent><Information /></RequireAuthComponent>}></Route>
          <Route path='/detail' element={<RequireAuthComponent><Detail /></RequireAuthComponent>}></Route>
          <Route path='/short%20videos/:title' element={<RequireAuthComponent><ListShowVideos /></RequireAuthComponent>}></Route>
          <Route path='/myShows' element={<RequireAuthComponent><MyShows /></RequireAuthComponent>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
