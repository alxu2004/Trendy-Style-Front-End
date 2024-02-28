import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {UsersList} from './components/UsersList'
import { Access } from './pages/Access';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/Access' Component={Access} />
        <Route path='/listar' Component={UsersList}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
