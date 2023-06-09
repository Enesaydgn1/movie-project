import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from './context/context.jsx'
import './styles/index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  
)
