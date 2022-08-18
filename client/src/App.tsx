import React from 'react';
import NavBar from './Feature/NavBar';
import './App.css';

const App : React.FC =  () =>  {
  return (
    <div className='w-screen h-auto flex flex-col bg-white'>
      <NavBar />
    </div>
  );
}

export default App;
