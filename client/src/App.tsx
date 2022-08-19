import React from 'react';
import NavBar from './Feature/NavBar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Banner from './Feature/Banner';

const App : React.FC =  () =>  {
  return (
    <div className='w-screen h-auto flex flex-col bg-white'>
      <NavBar />
      <main className='mt-12'>
        <Routes>
          <Route path='/' element={<Banner />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
