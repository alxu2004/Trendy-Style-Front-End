import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Access } from './pages/Access';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Women } from './pages/Women';
import { Child } from './pages/Child';
import { Men } from './pages/Men';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/Access' Component={Access} />
        <Route path='/men' Component={Men} />
        <Route path='/women' Component={Women}/>
        <Route path='/child' Component={Child} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
