import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout/AppLayout'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <AppLayout/>
    </BrowserRouter>
  </React.StrictMode>,
)
